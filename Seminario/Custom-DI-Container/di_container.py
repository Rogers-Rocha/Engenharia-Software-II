from typing import Any
from inspect import signature

def _extract_params(cls:type) -> list[str]:
    return [param_name for param_name in signature(cls).parameters.keys() if param_name != "self"]


class Container:
    def __init__(self, classes:list[type], configs:dict[type, dict[str, Any]]={}) -> None:
        self._params = {}
        self._configs = {}
        for cls in classes:
            cls_config = {}
            if cls in configs:
                cls_config = configs[cls]
            self.add_cls(cls, cls_config)

    def add_cls(self, cls:type, config:dict[str, Any]={}) -> None:
        self._params[cls] = _extract_params(cls)
        if config == {}:
            self._configs[cls] = {}
        self._configs[cls] = config

    def set_config(self, cls:type, config:dict[str, Any]) -> None:
        for param_name, value in config.items():
            self._configs[cls][param_name] = value

    def get_object(self, cls:type, **override) -> Any:
        init_args = {}
        for param_name in self._params[cls]:
            init_args[param_name] = None
            if param_name in override:
                init_args[param_name] = override[param_name]

        for param_name, config_value in self._configs[cls].items():
            if init_args[param_name] == None:
                init_args[param_name] = config_value
                if isinstance(config_value, type):
                    init_args[param_name] = self.get_object(config_value)
            elif isinstance(config_value, type) and isinstance(init_args[param_name], dict):
                init_args[param_name] = self.get_object(config_value, **init_args[param_name])
            
        return cls(**init_args)