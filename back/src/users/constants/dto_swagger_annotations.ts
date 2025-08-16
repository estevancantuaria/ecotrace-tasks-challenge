export const CREATE_USER_DTO_API = {
  NAME: {
    description: 'Nome do usuário',
    example: 'João da Silva',
    format: 'string',
    minLength: 1,
    message: 'O nome precisa ter pelo menos uma letra',
  },
  EMAIL: {
    description: 'Email do usuário',
    example: 'joao@example.com',
    format: 'email',
    minLength: 30,
    message: 'O formato do e-mail está inválido',
  },
  PASSWORD: {
    description: 'Senha do usuário',
    example: '123456',
    format: 'string',
    minLength: 6,
    maxLength: 50,
    minlengthMessage: 'A senha precisa ter pelo menos 6 caracteres',
    maxlengthMessage: 'A senha pode ter no máximo 50 caracteres',
    matches: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: 'A senha precisa ter pelo menos uma letra maiúscula, uma letra minúscula e um número'
  }
}

export const SIGN_IN_DTO_API = {
  EMAIL: {
    description: 'Email do usuário',
    example: 'joao@example.com',
    format: 'email',
    minLength: 30,
    message: 'O formato do e-mail está inválido',
  },
  PASSWORD: {
    description: 'Senha do usuário',
    example: '123456',
    format: 'string',
    minLength: 6,
    message: 'A senha precisa ter pelo menos 6 caracteres',
  },
}

export const IS_EMAIL_VALIDATION_MESSAGE = "O formato do e-mail está inválido"