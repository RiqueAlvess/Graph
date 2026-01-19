// src/Utils/auth.js
import { toastResponse } from './toast.js';

export const authUtils = {
  // 1. Verifica se o usuário está logado
  verifyJWT: async (request, reply) => {
    try {
      await request.jwtVerify(); 
    } catch (err) {
      return reply.status(401).send(
        toastResponse('error', 'Sessão Expirada', 'Sua sessão expirou. Faça login novamente.')
      );
    }
  },

  // 2. Verifica o nível de acesso (Role)
  verifyRole: (allowedRoles) => {
    return async (request, reply) => {
      const { role } = request.user;

      if (!allowedRoles.includes(role)) {
        return reply.status(403).send(
          toastResponse('error', 'Acesso Negado', 'Você não tem permissão para acessar este recurso.')
        );
      }
    };
  },

  // 3. Verifica o plano de assinatura (Plan)
  verifyPlan: (requiredPlan) => {
    return async (request, reply) => {
      const { plan } = request.user;

      if (plan !== 'PREMIUM' && plan !== requiredPlan) {
        return reply.status(403).send(
          toastResponse('warning', 'Plano Insuficiente', 'Funcionalidade exclusiva para assinantes Premium.')
        );
      }
    };
  }
};