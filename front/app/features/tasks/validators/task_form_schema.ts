import * as yup from 'yup';

export const taskFormSchema = yup.object({
    title: yup.string().required('Título é obrigatório'),
    description: yup.string(),
    user_id: yup.string().required('Responsável é obrigatório'),
    completed: yup.boolean(),
  });