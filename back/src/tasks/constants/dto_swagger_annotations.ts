export const CREATE_TASK_DTO_ANNOTATIONS = {
  TITLE : {
    description: 'Título da tarefa',
    example: 'Concluir projeto',
    minLength: 3,
  },
  USER_ID: {
    description: 'ID do usuário responsável pela tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  },
  DESCRIPTION: {
    description: 'Descrição detalhada da tarefa',
    example: 'Finalizar todas as funcionalidades do sistema de tarefas',
    required: false,
  },
  COMPLETED: {
    description: 'Status de conclusão da tarefa',
    example: false,
    default: false,
  },
}