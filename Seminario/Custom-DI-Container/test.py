
from di_container import Container
from abc import ABC, abstractmethod

class Aluno:
    def __init__(self, nome): 
        self.nome = nome

class IAlunoBackup(ABC):
    @abstractmethod
    def salvar(self, aluno):
        pass

class AlunoRepo(IAlunoBackup):
    def salvar(self, aluno):
        print(f"\nSalvando o aluno {aluno.nome} no banco de dados\n") 

class Professor:
    def __init__(self, aluno_backup):
        self.aluno_backup = aluno_backup

    def salvar_aluno(self, aluno):
        self.aluno_backup.salvar(aluno)

if __name__ == "__main__":
    container = Container(
        classes = [Aluno, AlunoRepo, Professor],
        configs = {
         Aluno: {"nome": "Mauricio"},
         Professor: {"aluno_backup": AlunoRepo}
         }
    )
    prof = container.get_object(Professor)
    aluno_default = container.get_object(Aluno)
    aluno_custom = container.get_object(Aluno, nome="Rogers")
    prof.salvar_aluno(aluno=aluno_default)
    prof.salvar_aluno(aluno=aluno_custom)