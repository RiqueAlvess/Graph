import { authService } from './service.js'; 
import { handleLogin } from './Auth/login.js';
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
  }
];

export async function appRoutes(fastify) {
  routesDictionary.forEach(route => {
    fastify.route(route);
  });
}