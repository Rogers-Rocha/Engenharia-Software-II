import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../css-classes/admin.css";

import AdminCard from "../componentes/adminCard";
import AdminModal from "../componentes/adminModal";

const colecoesDisponiveis = ["noticias", "eventos", "professores", "laboratorios", "livros", "socials", "sites", "coordenacao"];

const isImg = (k) => ["foto", "imagem"].some((x) => k.toLowerCase().includes(x));

const getType = (v, k = "") =>
  v?.seconds !== undefined ||
  (typeof v === "string" && (k.toLowerCase().includes("data") || (!isNaN(Date.parse(v)) && v.includes("-") && v.length >= 10)))
    ? "date"
    : Array.isArray(v)
      ? "array"
      : typeof v;

export const formatLabel = (s) => {
  const words = s
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(/\s+/);
  return words
    .map((w) => {
      const p = w.toLowerCase().replace(/cao/g, "ção");
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" de ");
};

const formatDate = (v, isInput = false) => {
  if (!v) return "";
  const d = new Date(v.seconds ? v.seconds * 1000 : v);
  return isInput ? d.toISOString().split("T")[0] : d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const getWeight = (k, type) => {
  const kl = k.toLowerCase();
  if (kl === "nome" || kl === "titulo") return 1;
  if (isImg(kl)) return 2;
  if (type === "array") return 5;
  if (type === "date") return 4;
  return 3;
};

const getLayout = (keys) => {
  const lay = [],
    skip = new Set();
  keys.forEach((c) => {
    if (skip.has(c)) return;
    const mIni = c.match(/^(.*)(Inicio|Início)$/),
      mFim = c.match(/^(.*)Fim$/);
    const parFim = mIni && keys.find((x) => x === `${mIni[1]}Fim`);
    const parIni = mFim && keys.find((x) => x === `${mFim[1]}Inicio` || x === `${mFim[1]}Início`);

    if (parFim) {
      lay.push({ type: "paired", base: mIni[1], inicio: c, fim: parFim });
      skip.add(c).add(parFim);
    } else if (parIni) {
      lay.push({ type: "paired", base: mFim[1], inicio: parIni, fim: c });
      skip.add(c).add(parIni);
    } else {
      lay.push({ type: "single", campo: c });
      skip.add(c);
    }
  });
  return lay;
};

export default function Admin({ setPagina }) {
  const [colecaoAtual, setColecaoAtual] = useState(colecoesDisponiveis[0]);
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [docEditando, setDocEditando] = useState(null);
  const [formData, setFormData] = useState({});
  const [schema, setSchema] = useState({
    raiz: {},
    sub: {},
    layout: [],
    layoutSub: {},
    ordemSub: {},
  });

  const carregarDados = async () => {
    setCarregando(true);
    const snap = await getDocs(collection(db, colecaoAtual));
    const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setDocumentos(docs);

    let ord = [],
      mapSub = {},
      tipSub = {},
      esq = {};
    if (docs.length > 0) {
      ord = Object.keys(docs[0]).filter((k) => k !== "id");
      ord.forEach((k) => {
        if (Array.isArray(docs[0][k]) && docs[0][k][0]) {
          mapSub[k] = Object.keys(docs[0][k][0]).filter((s) => s !== "id");
          tipSub[k] = {};
          mapSub[k].forEach((s) => (tipSub[k][s] = getType(docs[0][k][0][s], s)));
        }
      });
    }

    docs.forEach((d) =>
      Object.keys(d)
        .filter((k) => k !== "id")
        .forEach((k) => {
          if (!esq[k]) {
            esq[k] = getType(d[k], k);
            if (!ord.includes(k)) ord.push(k);
          }
          if (esq[k] === "array" && !mapSub[k] && d[k][0]) {
            mapSub[k] = Object.keys(d[k][0]).filter((s) => s !== "id");
            tipSub[k] = {};
            mapSub[k].forEach((s) => (tipSub[k][s] = getType(d[k][0][s], s)));
          }
        }),
    );

    ord.sort((a, b) => {
      const wa = getWeight(a, esq[a]),
        wb = getWeight(b, esq[b]);
      return wa !== wb ? wa - wb : a.localeCompare(b);
    });

    const layoutSub = {};
    Object.keys(mapSub).forEach((k) => {
      mapSub[k].sort((a, b) => {
        const wa = getWeight(a, tipSub[k][a]),
          wb = getWeight(b, tipSub[k][b]);
        return wa !== wb ? wa - wb : a.localeCompare(b);
      });
      layoutSub[k] = getLayout(mapSub[k]);
    });

    setSchema({
      raiz: esq,
      sub: tipSub,
      layout: getLayout(ord),
      layoutSub,
      ordemSub: mapSub,
    });
    setCarregando(false);
  };

  useEffect(() => {
    carregarDados();
  }, [colecaoAtual]);

  const abrirModal = (doc = null) => {
    setDocEditando(doc ? doc.id : null);
    const fd = {};
    if (!doc) {
      Object.entries(schema.raiz).forEach(
        ([c, t]) =>
          (fd[c] =
            t === "number" ? 0 : t === "boolean" ? false : t === "array" ? [] : t === "date" ? new Date().toISOString().split("T")[0] : ""),
      );
    } else {
      Object.assign(fd, doc);
      delete fd.id;
      Object.keys(schema.raiz).forEach((c) => {
        if (schema.raiz[c] === "date" && fd[c]) fd[c] = formatDate(fd[c], true);
        if (schema.raiz[c] === "array" && fd[c]) {
          fd[c] = fd[c].map((i) => {
            const ni = { ...i };
            Object.keys(schema.sub[c] || {}).forEach((s) => {
              if (schema.sub[c][s] === "date" && ni[s]) ni[s] = formatDate(ni[s], true);
            });
            return ni;
          });
        }
      });
    }
    setFormData(fd);
    setModalAberto(true);
  };

  const handleChange = (e, c, t) =>
    setFormData({
      ...formData,
      [c]: t === "boolean" ? e.target.checked : t === "number" ? Number(e.target.value) : e.target.value,
    });

  const handleArrChange = (c, i, sk, val, t) => {
    const arr = [...(formData[c] || [])];
    arr[i][sk] = t === "number" ? Number(val) : val;
    setFormData({ ...formData, [c]: arr });
  };

  const addArrItem = (c) => {
    const arr = [...(formData[c] || [])],
      obj = {};
    (schema.ordemSub[c] || []).forEach((k) => {
      const t = schema.sub[c]?.[k];
      obj[k] = t === "number" ? 0 : t === "boolean" ? false : t === "date" ? new Date().toISOString().split("T")[0] : "";
    });
    arr.push(obj);
    setFormData({ ...formData, [c]: arr });
  };

  const rmArrItem = (c, i) => {
    const arr = [...(formData[c] || [])];
    arr.splice(i, 1);
    setFormData({ ...formData, [c]: arr });
  };

  const handleUpload = async (e, isArray = false, rootKey = "", arrIndex = 0, subKey = "") => {
    const file = e.target.files[0];
    if (!file) return;

    setCarregando(true);
    const dataForm = new FormData();
    dataForm.append("image", file);
    const apiKey = "d14cf63e18ef0e4d484b2f7872fdfc02";

    const resposta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: dataForm });
    const resultado = await resposta.json();

    if (resultado.success) {
      const url = resultado.data.url;
      if (isArray) handleArrChange(rootKey, arrIndex, subKey, url, "string");
      else handleChange({ target: { value: url } }, rootKey, "string");
    }
    setCarregando(false);
  };

  const salvarDoc = async (e) => {
    e.preventDefault();

    for (const k of Object.keys(schema.raiz)) {
      const v = formData[k],
        t = schema.raiz[k];
      if (t !== "array" && !isImg(k) && (v === "" || v === null || v === undefined)) {
        return alert(`O campo "${formatLabel(k)}" não pode estar vazio.`);
      }
      if (t === "array" && Array.isArray(v)) {
        for (let i = 0; i < v.length; i++) {
          for (const sk of Object.keys(schema.sub[k] || {})) {
            const sv = v[i][sk],
              st = schema.sub[k][sk];
            if (st !== "array" && !isImg(sk) && (sv === "" || sv === null || sv === undefined)) {
              return alert(`O campo "${formatLabel(sk)}" no item ${i + 1} de "${formatLabel(k)}" não pode estar vazio.`);
            }
          }
        }
      }
    }

    setCarregando(true);
    const dados = { ...formData };
    Object.keys(schema.raiz).forEach((c) => {
      if (schema.raiz[c] === "date" && dados[c]) dados[c] = Timestamp.fromDate(new Date(dados[c] + "T00:00:00"));
      if (schema.raiz[c] === "array" && dados[c]) {
        dados[c] = dados[c].map((i) => {
          const ni = { ...i };
          Object.keys(schema.sub[c] || {}).forEach((s) => {
            if (schema.sub[c][s] === "date" && ni[s]) ni[s] = Timestamp.fromDate(new Date(ni[s] + "T00:00:00"));
          });
          return ni;
        });
      }
    });

    if (docEditando) await updateDoc(doc(db, colecaoAtual, docEditando), dados);
    else await addDoc(collection(db, colecaoAtual), dados);

    alert("Salvo com sucesso!");
    setModalAberto(false);
    carregarDados();
    setCarregando(false);
  };

  const deletarDocumento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    setCarregando(true);
    await deleteDoc(doc(db, colecaoAtual, id));
    alert("Excluído!");
    carregarDados();
    setCarregando(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-top-bar">
        <h2>Painel Administrativo</h2>
        <button className="br-button danger" onClick={() => signOut(auth).then(() => setPagina("home"))}>
          <i className="fas fa-sign-out-alt admin-btn-icon" /> Sair
        </button>
      </div>

      <div className="admin-collections-nav">
        {colecoesDisponiveis.map((c) => (
          <button key={c} className={`br-button ${colecaoAtual === c ? "primary" : "secondary"}`} onClick={() => setColecaoAtual(c)}>
            {formatLabel(c)}
          </button>
        ))}
      </div>

      <div className="admin-section-title-bar">
        <h3>Gerenciando: {formatLabel(colecaoAtual)}</h3>
        <button className="br-button primary" onClick={() => abrirModal()}>
          <i className="fas fa-plus admin-btn-icon" /> Novo
        </button>
      </div>

      {carregando && !modalAberto ? (
        <p>Carregando...</p>
      ) : (
        <div className="admin-cards-grid">
          {documentos.map((d) => (
            <AdminCard
              key={d.id}
              docItem={d}
              schema={schema}
              onEdit={abrirModal}
              onDelete={deletarDocumento}
              formatDate={formatDate}
              formatLabel={formatLabel}
            />
          ))}
        </div>
      )}

      {modalAberto && (
        <AdminModal
          docEditando={docEditando}
          schema={schema}
          formData={formData}
          carregando={carregando}
          salvarDoc={salvarDoc}
          fecharModal={() => setModalAberto(false)}
          handleChange={handleChange}
          handleArrChange={handleArrChange}
          rmArrItem={rmArrItem}
          addArrItem={addArrItem}
          formatLabel={formatLabel}
          handleUpload={handleUpload}
        />
      )}
    </div>
  );
}
