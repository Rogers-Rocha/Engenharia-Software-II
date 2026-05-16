from repositorio.interface import IRepoAluno

class AlunoRepo(IRepoAluno):
    def salvar(self, aluno):
        print(f"\nSalvando o aluno {aluno.nome} no banco de dados.\n")