from candidato import Candidato
from test_classes import Pdf_Test, Wpp_Test, Email_Test

from dependency_injector import containers, providers

class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    pdf_test = providers.Factory(
        Pdf_Test
    )

    wpp_test = providers.Factory(
        Wpp_Test,
        address=config.wpp_address
    )

    email_test = providers.Factory(
        Email_Test,
        address=config.email_address
    )

    list_contato = providers.List(
        wpp_test,
        email_test
    )

    candidato = providers.Factory(
        Candidato,
        curriculo=pdf_test,
        contatos=list_contato
    )

if __name__ == "__main__":
    container = Container()
    # Valores Padrões para os objetos injetados
    container.config.from_dict({
        "wpp_address": "12345678912",
        "email_address": "abc@mail"
    })

    wpp_avaliador = container.wpp_test(address="12345678913")
    email_avaliador = container.email_test(address="abd@mail")

    candidato = container.candidato()
    
    candidato.enviar_curriculo(wpp_avaliador)
    wpp_avaliador.mandar_msg(candidato.contatos[0], "Curriculo recebido")

    candidato.enviar_curriculo(email_avaliador)
    email_avaliador.mandar_msg(candidato.contatos[1], "Curriculo recebido")
