# Cenário:
#   O professor precisa salvar o nome de alunos dentro de um programa

# Entidade Aluno que define o que um aluno deve ter
class Aluno:
    def __init__(self, nome): # __init__ é chamado automaticamente quando cria um objeto
        # nesse caso, o init é chamado automaticamente lá em "aluno = Aluno()" no __name__
        self.nome = nome # self.nome é o atributo do objeto e Armazena o nome do aluno

# Entidade AlunuRepo simula o salvamento de um aluno no banco de dados, mas não salva de verdade
# apenas imprime uma mensagem
class AlunoRepo:
    def salvar(self, aluno): # Método que recebe um objeto aluno
        print(f"\nSalvando o aluno {aluno.nome} no banco de dados\n") 

# Entidade Prodessor executa uma ação sobre o aluno e funciona como uma regra de negócio
class Professor:
    def salvar_aluno(self, aluno): # recebe e manda salvar esse aluno no "banco" usando o AlunoRepo,
        # ou seja, o Professor está delegando a responsabilidade de salvar para o repositório.
        # fluxo: 
        # 1 - O método salvar_aluno é chamado
        # 2 - Ele cria um AlunoRepo
        # 3 - Chama repo.salvar(aluno)
        # 4 - O repositorio imprime a mensagem
        repo = AlunoRepo() # o Professor depende diretamente de uma implementação concreta (AlunoRepo)
        repo.salvar(aluno)
    
# Execute esse código somente se esse arquivo for o principal
# fluxo:
# 1 - Python cria um objeto aluno ao chamar a classe Aluno
# 2 - chama o construtor "def __init__(self,nome):" dessa classe Aluno
# 3 - o valor "Leticia" é passado para dentro do construtor e é armazenado

# 4 - Um objeto Professor é criado ao chamar a classe Professor
# 5 - Não tem construtor personalizado na classe Professor, então só instancia

# 6 - chama o método "professor.salvar_aluno(aluno)"
# 7 - dentro de Professor.salvar_aluno:
#   7.1 Cria o repositorio em "repo = AlunoRepo()", então um objeto AlunoRepo é criado na classe AlunoRepo
#   7.2 Chama o metodo salvar da classe AlunoRepo
#   7.3 O python acessa o atributo nome que foi definido no __init__
#   7.4 Imprime a mensagem dentro do método salvar da classe AlunoRepo
if __name__ == "__main__":
    aluno = Aluno("Leticia")
    professor = Professor()
    professor.salvar_aluno(aluno)