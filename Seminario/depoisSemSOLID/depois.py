from abc import ABC, abstractmethod

class IALunoBackup(ABC):

    @abstractmethod
    def salvar(self, aluno):
        pass

class AlunoRepo(IALunoBackup):
    def salvar(self, aluno):
        print(f"\nSalvando o aluno {aluno.nome} no repositorio\n")

class Aluno:
    def __init__(self, nome):
        self.nome = nome

class Professor:
    def __init__(self, aluno_backup):
        self.aluno_backup = aluno_backup

    def salvar_aluno(self, aluno):
        self.aluno_backup.salvar(aluno)

if __name__ == "__main__":
    aluno = Aluno("Joana")

    repo = AlunoRepo() # criação de dependencia
    prof = Professor(repo) # injeção

    prof.salvar_aluno(aluno)