# No TOTAL são 14 RF e 9 RNF

## Medidas de segurança
### Requisitos Funcionais 

- O sistema deverá restringir o acesso às funcionalidades protegidas de acordo com o perfil e as permissões do usuário autenticado.
- O sistema deverá impedir que usuários não autorizados acessem, visualizem, modifiquem ou excluam recursos restritos.
- O sistema deverá registrar eventos relevantes de segurança, incluindo tentativas de autenticação bem-sucedidas e malsucedidas, acessos negados e ações administrativas.
- O sistema deverá gerar alertas ou disponibilizar informações de auditoria para análise de eventos de segurança registrados.

### Requisitos não funcionais

- O sistema deverá atender às recomendações do OWASP Top Ten Web Application Security Risks 2025 relacionadas aos seguintes riscos:
-  A01:2025 – Controle de Acesso Quebrado;
-  A07:2025 – Falhas de Autenticação;
-  A09:2025 – Falhas no Registro e Alerta de Segurança.
- Os mecanismos de controle de acesso deverão ser aplicados de forma consistente em todas as funcionalidades protegidas do sistema.
- Os registros de segurança deverão conter informações suficientes para rastreabilidade e auditoria, preservando a integridade dos dados registrados.


## Cookies e armazenamento local
### Requisitos funcionais

- O sistema deverá utilizar cookies e/ou armazenamento local do navegador para persistir informações necessárias ao funcionamento da aplicação entre sessões ou recarregamentos da página.
- O sistema deverá recuperar automaticamente os dados armazenados localmente para restaurar preferências e estados previamente salvos pelo usuário.
- O sistema deverá permitir a atualização e remoção dos dados armazenados localmente quando necessário.

### Requisitos não funcionais

- O armazenamento local deverá ser utilizado apenas para informações não sensíveis ou previamente definidas pela política de segurança do sistema.
- Os cookies utilizados deverão possuir configuração apropriada de validade e finalidade, minimizando riscos de exposição indevida das informações armazenadas.


## Fetch API
### Requisitos funcionais

- O sistema deverá realizar requisições assíncronas utilizando a Fetch API para envio e obtenção de dados entre o cliente e os serviços disponibilizados pela aplicação.
- O sistema deverá processar as respostas recebidas das requisições, atualizando dinamicamente a interface do usuário.
- O sistema deverá tratar erros decorrentes das requisições, informando adequadamente falhas de comunicação ou indisponibilidade dos serviços.

### Requisitos não funcionais

- As operações realizadas por meio da Fetch API deverão apresentar tratamento de exceções e respostas compatíveis com os códigos de status HTTP retornados pelos serviços.
- As requisições deverão priorizar comunicação eficiente, reduzindo recarregamentos completos da interface e melhorando a experiência do usuário.

## Autenticação simples
### Requisitos funcionais

- O sistema deverá permitir que usuários realizem autenticação mediante fornecimento de credenciais válidas.
- O sistema deverá validar as credenciais informadas antes de conceder acesso às funcionalidades restritas.
- O sistema deverá encerrar a sessão do usuário por meio da funcionalidade de logout.
- O sistema deverá impedir o acesso às áreas protegidas quando o usuário não estiver autenticado.

### Requisitos não funcionais
- As credenciais dos usuários não deverão ser armazenadas em texto puro, devendo ser protegidas por mecanismos adequados de armazenamento seguro.
- O processo de autenticação deverá estar alinhado às recomendações do OWASP A07:2025 – Falhas de Autenticação, reduzindo riscos associados à validação inadequada de identidade.
