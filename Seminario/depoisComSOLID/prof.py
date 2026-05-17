class Professor:
    def __init__(self, repo):
        self.repo = repo

    def salvar_aluno(self, aluno):
        self.repo.salvar(aluno)