export const authRateLimit = {
  max: 5,               // Máximo de 5 requisições
  timeWindow: '1 minute', // Por minuto
  errorResponse: (req, context) => {
    return {
      toast: {
        type: 'error',
        title: 'Calma aí!',
        message: 'Muitas tentativas. Tente novamente em um minuto.'
      }
    };
  }
};