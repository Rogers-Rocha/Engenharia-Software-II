from aluno import Aluno
from prof import Professor
from repositorio.alunoRepo import AlunoRepo

if __name__ == "__main__":
    aluno = Aluno("Heitor")

    repo = AlunoRepo() # criação da dependência
    prof = Professor(repo) # injeção

    prof.salvar_aluno(aluno)