export const TASK_ID_PARAM_ANNOTATIONS = {
  ID: {
    name: 'id',
    description: 'UUID da tarefa no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  },
}

//CONTROLLER_ANNOTATIONS
export const CREATE_TASK_ANNOTATION = 'Criar uma nova tarefa'

export const FIND_ALL_ANNOTATION = 'Listar todas as tarefas'

export const FIND_BY_ID_ANNOTATION = 'Listar uma tarefa por ID'

export const UPDATE_TASK_ANNOTATION = 'Atualizar tarefa'

export const DELETE_TASK_ANNOTATION = 'Deletar tarefa'