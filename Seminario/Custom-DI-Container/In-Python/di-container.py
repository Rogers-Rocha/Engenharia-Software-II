from inspect import signature

# Extrai todos os parametros do construtor de uma classe
def _extract_params(cls:type, exclude_self=True):
    params = [param for param in signature(cls.__init__).parameters.keys()]
    if exclude_self:
        params = params[1:]
    return params

# *** Essa implementação so funciona com parâmetros nomeados ***
class Container:
    def __init__(self, classes:list[type]=[]):
        # Estrutura de _configs: {<classe>: {<parametro>: <valor>}}
        self._configs = {cls: {param: None for param in _extract_params(cls)} for cls in classes}

    def set_config(self, cls:type, config:dict[str, object]):
        if cls not in self._configs:
            raise ValueError(f"Classe {cls.__name__} nao foi adicionado ao container")
        
        for param_name, value in config.items():
            # Checa se todos os parametros de config fazem parte dos parametros da classe
            if param_name not in self._configs[cls]:
                raise ValueError(f"Construtor da classe {cls.__name__} nao possui parametro {param_name}")

            # Ignorando tipagem para manter o tipo de value dinamico
            self._configs[cls][param_name] = value  # type: ignore

    # ||| IMPLEMENTAR |||
    def new(self, cls:type, **kwargs):
        pass

    # ||| IMPLEMENTAR |||
    # def override(self, ...)