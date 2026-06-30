// src/firebase/useColecao.js
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase.js";

// Hook genérico para buscar qualquer coleção do Firestore
// Uso: const { dados, carregando, erro } = useColecao("professores")
export function useColecao(nomeColecao, campoOrdem = null) {
  const [dados,      setDados]      = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro,       setErro]       = useState(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const ref = collection(db, nomeColecao);
        const q   = campoOrdem ? query(ref, orderBy(campoOrdem)) : ref;
        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDados(lista);
      } catch (e) {
        console.error(`Erro ao buscar coleção "${nomeColecao}":`, e);
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    };

    buscar();
  }, [nomeColecao, campoOrdem]);

  return { dados, carregando, erro };
}