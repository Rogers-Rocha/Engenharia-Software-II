class Curriculo {
  bool bom = false;
}

class MeioContato {
  static const String zap = "zap";
  static const String email = "email";
}

class Candidato {
  String nome;
  String meioContato;

  Candidato(this.nome, this.meioContato);

  String obterMeioContato() {
    return meioContato;
  }

  Curriculo obterCurriculoPedindoViaZap() {
    print("Obtendo curriculo de $nome via WhatsApp...");
    return Curriculo();
  }

  Curriculo obterCurriculoPedindoViaEmail() {
    print("Obtendo curriculo de $nome via Email...");
    return Curriculo();
  }
}

class BancoDeCandidatos {
  static BancoDeCandidatos obter() {
    return BancoDeCandidatos();
  }

  List<Candidato> obterCandidatosRecentes() {
    return [
      Candidato("Jodon", MeioContato.zap),
      Candidato("Carlos", MeioContato.email),
      Candidato("Marina", MeioContato.zap),
    ];
  }
}

class TechRecuteCansada {
  List<Curriculo> curriculos = [];
  List<Candidato> candidatos = [];

  BancoDeCandidatos bancoDeCandidatos =
      BancoDeCandidatos.obter();

  void obterCurriculos() {
    candidatos =
        bancoDeCandidatos.obterCandidatosRecentes();

    for (var candidato in candidatos) {
      String meioContatoCandidato =
          candidato.obterMeioContato();

      Curriculo? curriculo;

      if (meioContatoCandidato == MeioContato.zap) {
        curriculo =
            candidato.obterCurriculoPedindoViaZap();
      } else if (meioContatoCandidato ==
          MeioContato.email) {
        curriculo =
            candidato.obterCurriculoPedindoViaEmail();
      }

      if (curriculo != null) {
        curriculos.add(curriculo);
      }
    }
  }

  bool passaPeloMeuCrivo(Curriculo curriculo) {
    // Exemplo simples de validacao
    return curriculo != null;
  }

  void analisarCurriculos() {
    obterCurriculos();

    for (var curriculo in curriculos) {
      if (passaPeloMeuCrivo(curriculo)) {
        curriculo.bom = true;
      }
    }

    print("Analise finalizada!");
  }
}

void main() {
  // Executando o sistema
  TechRecuteCansada empresa =
      TechRecuteCansada();

  empresa.analisarCurriculos();
}