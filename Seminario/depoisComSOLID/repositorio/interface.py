from abc import ABC, abstractmethod

class IRepoAluno(ABC):

    @abstractmethod
    def salvar(self, nome):
        pass