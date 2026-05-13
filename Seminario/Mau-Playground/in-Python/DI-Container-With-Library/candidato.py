from interfaces import Pdf, Contato

class Candidato:
    def __init__(self, curriculo:Pdf, contatos:list[Contato]) -> None:
        self.curriculo = curriculo
        self.contatos = contatos

    def enviar_curriculo(self, receiver:Contato) -> None:
        for cont in self.contatos:
            try:
                cont.mandar_msg(receiver=receiver, msg=self.curriculo)
            except:
                continue
            else:
                return

        raise Exception("Não foi possivel enviar a mensagem")
