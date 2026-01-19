import { prisma } from '../lib/prisma.js';
import { validateResetPassword } from '../Utils/validation.js';
import { toastResponse } from '../Utils/toast.js';
import bcrypt from 'bcrypt';

/**
 * Handler para redefinir a senha do usuário
 * POST /auth/reset-password
 */
export async function handleResetPassword(request, reply) {
  try {
    // Valida os dados recebidos
    const { token, password } = validateResetPassword(request.body);

    // Busca o token no banco
    const resetToken = await prisma.passwordReset.findUnique({
      where: { token },
      include: {
        user: true
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

    // Gera o hash da nova senha
    const passwordHash = await bcrypt.hash(password, 12);

    // Atualiza a senha do usuário e marca o token como usado em uma transação
    await prisma.$transaction([
      // Atualiza a senha do usuário
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash }
      }),
      // Marca o token como usado
      prisma.passwordReset.update({
        where: { id: resetToken.id },
        data: { used: true }
      }),
      // Registra a ação no log
      prisma.log.create({
        data: {
          action: 'PASSWORD_RESET_COMPLETED',
          details: `Senha redefinida com sucesso para ${resetToken.user.email}`,
          ip: request.ip,
          userId: resetToken.userId
        }
      })
    ]);

    return reply.code(200).send(
      toastResponse('success', 'Senha redefinida',
        'Sua senha foi redefinida com sucesso! Você já pode fazer login com a nova senha.')
    );

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);

    // Se for erro de validação do Zod
    if (error.name === 'ZodError') {
      return reply.code(400).send(
        toastResponse('error', 'Dados inválidos', error.errors[0].message)
      );
    }

    // Erro genérico
    return reply.code(500).send(
      toastResponse('error', 'Erro no servidor',
        'Não foi possível redefinir sua senha. Tente novamente.')
    );
  }
}
