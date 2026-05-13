from interfaces import Pdf, Contato
    
class Pdf_Test(Pdf):
    def give_chunk(self, chunk_size:int=-1) -> bytes:
        return b"TESTING TESTING TESTING"

class Wpp_Test(Contato):
    def _valid(self) -> None:
        # Wpp == (<número> * 11) => Wpp é valido
        if (len(self._address) != 11 or not self._address.isalnum()):
            raise ValueError("Numero de address de Whatsapp invalido.")
        
    def mandar_msg(self, receiver:Contato, msg:str|Pdf) -> None:
        if type(self) != type(receiver):
            raise ValueError("MENSAGEM NAO ENVIADA POR INCOMPATIBILIDADE")
        print(f"MENSAGEM ENVIADA DE +55{self._address} para +55{receiver._address} VIA WHATSAPP")
        print(f"    CONTEUDO: {msg if type(msg)==str else type(msg).__name__}")

class Email_Test(Contato):
    # Email == (<local_part> + @ + <domain>) => Email é válido, onde:
    #   local_part = <letra> + <letra|numero> * n
    #   domain     = <letra> * n
    def _valid(self) -> None:
        if self._address.count("@") == 1:
            # local_part@domain == Email
            local_part, domain = self._address.split("@")
            # local
            if local_part[0].isalpha() and local_part.isalnum() and domain.isalpha():
                return 
        # Numero valido == true -> pula acionamento do erro
        raise ValueError("Endereco de email invalido")
    
    def mandar_msg(self, receiver:Contato, msg:str|Pdf) -> None:
        if type(self) != type(receiver):
            raise ValueError("MENSAGEM NAO ENVIADA POR INCOMPATIBILIDADE")
        print(f"MENSAGEM ENVIADA DE {self._address} para {receiver._address} VIA EMAIL")
        print(f"    CONTEUDO: {msg if type(msg)==str else type(msg).__name__}")
