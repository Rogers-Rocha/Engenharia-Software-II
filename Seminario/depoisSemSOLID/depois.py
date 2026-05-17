from abc import ABC, abstractmethod

class IRepoALuno(ABC):

    @abstractmethod
    def salvar(self, aluno):
        pass

class AlunoRepo(IRepoALuno):
    def salvar(self, aluno):
        print(f"\nSalvando o aluno {aluno.nome} no banco de dados\n")

class Aluno:
    def __init__(self, nome):
        self.nome = nome

class Professor:
    def __init__(self, repo):
        self.repo = repo

    def salvar_aluno(self, aluno):
        self.repo.salvar(aluno)

if __name__ == "__main__":
    aluno = Aluno("Joana")

    repo = AlunoRepo() # criação de dependencia
    prof = Professor(repo) # injeção

    prof.salvar_aluno(aluno)