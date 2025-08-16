export const USER_ID_PARAM_ANNOTATIONS = {
  ID: {
    name: 'id',
    description: 'UUID do usuário no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  },
}

//CONTROLLER_ANNOTATIONS
export const CREATE_USER_ANNOTATION = 'Criar um novo usuário'

export const SIGN_IN_ANNOTATION = 'Fazer login'

export const FIND_ALL_ANNOTATION = 'Listar todos os usuários'

export const FIND_BY_ID_ANNOTATION = 'Listar um usuário por ID'

export const UPDATE_USER_ANNOTATION = 'Atualizar usuário'

export const DELETE_USER_ANNOTATION = 'Deletar usuário'