import { authService } from './service.js';
import { handleLogin } from './Auth/login.js';
import { handleForgotPassword } from './Auth/forgotPassword.js';
import { handleVerifyResetToken } from './Auth/verifyResetToken.js';
import { handleResetPassword } from './Auth/resetPassword.js';
import { authRateLimit } from './Utils/rateLimit.js';

export const routesDictionary = [
  // Rota de Registro
  {
    method: 'POST',
    url: '/auth/register',
    handler: authService.register,
    config: {
      rateLimit: authRateLimit
    }
  },
  
  // Rota de Login
  {
    method: 'POST',
    url: '/auth/login',
    handler: handleLogin,
    config: {
      rateLimit: authRateLimit
    }
  },

  // Rota de Esqueci Minha Senha
  {
    method: 'POST',
    url: '/auth/forgot-password',
    handler: handleForgotPassword,
    config: {
      rateLimit: authRateLimit
    }
  },

  // Rota para Verificar Token de Reset
  {
    method: 'GET',
    url: '/auth/verify-reset-token/:token',
    handler: handleVerifyResetToken
  },

  // Rota de Redefinição de Senha
  {
    method: 'POST',
    url: '/auth/reset-password',
    handler: handleResetPassword,
    config: {
      rateLimit: authRateLimit
    }
  }
];

export async function appRoutes(fastify) {
  routesDictionary.forEach(route => {
    fastify.route(route);
  });
}