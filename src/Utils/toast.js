export const toastResponse = (type, title, message) => {
  return {
    toast: {
      type,    // 'success', 'error', 'warning', 'info'
      title,   // Ex: 'Erro de Validação'
      message  // Ex: 'A senha deve conter uma letra maiúscula'
    }
  };
};

// Formata erros do Zod especificamente para o formato de Toast
export const formatZodToToast = (error) => {
  const firstError = error.errors[0];
  return toastResponse('error', 'Campo Inválido', firstError.message);
};