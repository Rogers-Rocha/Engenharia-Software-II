class Aluno:
    def __init__(self, nome):
        self.nome = nome


class AlunoRepo:
    def salvar(self, aluno):
        print(f"\nSalvando aluno {aluno.nome} no banco de dados\n")

class Professor:
    def salvar_aluno(self, aluno):
        repo = AlunoRepo()
        repo.salvar(aluno)

if __name__ == "__main__":
    aluno = Aluno("Joao")
    professor = Professor()
    professor.salvar_aluno(aluno)