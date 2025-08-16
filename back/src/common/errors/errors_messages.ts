export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Ocorreu um erro interno, cheque os logs do servidor para mais detalhes',

  TASK: {
    NOT_FOUND: 'Tarefa não encontrada',
    CREATE_ERROR: 'Erro interno ao criar tarefa.',
    UPDATE_ERROR: 'Erro interno ao atualizar tarefa.',
    DELETE_ERROR: 'Erro interno ao deletar tarefa.',
    LIST_ERROR: 'Erro interno ao listar tarefas.',
    FIND_ERROR: 'Erro interno ao buscar tarefa.',
    DELETE_SUCCESS: 'Tarefa removida com sucesso'
  },

  USER: {
    NOT_FOUND: 'Usuário não encontrado',
    ALREADY_EXISTS: 'Usuário já cadastrado',
    INVALID_PASSWORD: 'Senha inválida',
    CREATE_ERROR: 'Erro interno ao criar o usuário.',
    UPDATE_ERROR: 'Erro interno ao atualizar usuário.',
    DELETE_ERROR: 'Erro interno ao deletar usuário.',
    LIST_ERROR: 'Erro interno ao listar usuários.',
    FIND_ERROR: 'Erro interno ao buscar usuário.',
    DELETE_SUCCESS: 'Usuário removido com sucesso'
  }
} as const;