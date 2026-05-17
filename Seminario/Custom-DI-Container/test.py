
from di_container import Container
from abc import ABC, abstractmethod

class Aluno:
    def __init__(self, nome): 
        self.nome = nome

class IAlunoRepo(ABC):
    @abstractmethod
    def salvar(self, aluno:Aluno):
        pass

class AlunoRepo(IAlunoRepo):
    def salvar(self, aluno:Aluno):
        print(f"\nSalvando o aluno {aluno.nome} no banco de dados\n") 

class Professor:
    def __init__(self, repo:AlunoRepo):
        self._repo = repo

    def salvar_aluno(self, aluno:Aluno):
        self._repo.salvar(aluno)

if __name__ == "__main__":
    container = Container(
        [Aluno, AlunoRepo, Professor],
        {Aluno: {"nome": "Mauricio"},
         Professor: {"repo": AlunoRepo}
         }
    )
    prof = container.get_object(Professor)
    aluno_default = container.get_object(Aluno)
    aluno_custom = container.get_object(Aluno, nome="Rogers")
    prof._repo.salvar(aluno=aluno_default)
    prof._repo.salvar(aluno=aluno_custom)