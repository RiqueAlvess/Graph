import { z } from 'zod';

// Regras de senha: Min 8 chars, 1 Maiúscula, 1 Especial entre (., @, !, #)
const passwordValidation = z.string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[.@!#]/, "A senha deve conter um caractere especial (., @, !, #)");

export const registerSchema = z.object({
  name: z.string()
    .min(3, "Nome muito curto")
    .max(50, "Nome muito longo")
    .trim(),
  email: z.string()
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .trim(),
  password: passwordValidation
});

// Função auxiliar para validar e retornar apenas os dados limpos
export const validateRegister = (data) => {
  return registerSchema.parse(data);
};

// Schema para solicitar redefinição de senha
export const forgotPasswordSchema = z.object({
  email: z.string()
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .trim()
});

// Schema para redefinir senha com token
export const resetPasswordSchema = z.object({
  token: z.string()
    .min(1, "Token é obrigatório"),
  password: passwordValidation
});

// Funções auxiliares de validação
export const validateForgotPassword = (data) => {
  return forgotPasswordSchema.parse(data);
};

export const validateResetPassword = (data) => {
  return resetPasswordSchema.parse(data);
};