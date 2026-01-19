import { prisma } from '../lib/prisma.js';
import { toastResponse } from '../Utils/toast.js';

/**
 * Handler para verificar se um token de redefinição é válido
 * GET /auth/verify-reset-token/:token
 */
export async function handleVerifyResetToken(request, reply) {
  try {
    const { token } = request.params;

    if (!token) {
      return reply.code(400).send(
        toastResponse('error', 'Token inválido', 'Token não fornecido.')
      );
    }

    // Busca o token no banco
    const resetToken = await prisma.passwordReset.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Verifica se o token existe
    if (!resetToken) {
      return reply.code(404).send(
        toastResponse('error', 'Token inválido',
          'Este link de redefinição não é válido ou já foi utilizado.')
      );
    }

    // Verifica se o token já foi usado
    if (resetToken.used) {
      return reply.code(400).send(
        toastResponse('error', 'Token já utilizado',
          'Este link já foi utilizado. Solicite uma nova redefinição de senha.')
      );
    }

    // Verifica se o token expirou
    if (new Date() > resetToken.expiresAt) {
      return reply.code(400).send(
        toastResponse('error', 'Token expirado',
          'Este link expirou. Solicite uma nova redefinição de senha.')
      );
    }

    // Token válido
    return reply.code(200).send({
      valid: true,
      user: {
        name: resetToken.user.name,
        email: resetToken.user.email
      }
    });

  } catch (error) {
    console.error('Erro ao verificar token:', error);

    return reply.code(500).send(
      toastResponse('error', 'Erro no servidor',
        'Não foi possível verificar o token. Tente novamente.')
    );
  }
}
