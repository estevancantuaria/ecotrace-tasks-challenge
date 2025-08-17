import { ERROR_MESSAGES } from "../constants/error_messages";
import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Digite um email válido')
        .required(ERROR_MESSAGES.EMPTY_FIELDS),
    password: yup
        .string()
        .required(ERROR_MESSAGES.EMPTY_FIELDS),
});