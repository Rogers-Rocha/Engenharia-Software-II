from abc import ABC, abstractmethod

# Interface de leitor de Pdf
class Pdf(ABC):
    @abstractmethod
    def give_chunk(self, chunk_size:int=-1) -> bytes:
        pass

# Interface/Classe base para qualquer tipo de contato: Wpp, Email, Telefone, Correiro, etc.
class Contato(ABC):
    def __init__(self, address:str) -> None:
        self._address = address # Address pode ser numero de telefone, endereço de email, etc.
        self._valid()

    # Classes <Contato> precisam validar o endereço na instânciacão
    @abstractmethod
    def _valid(self) -> None:
        pass

    # Classes <Contato> precisam implementar mandar_msg
    @abstractmethod
    def mandar_msg(self, receiver:"Contato", msg:str|Pdf) -> None:
        pass

    @property
    def address(self) -> str:
        return self._address
