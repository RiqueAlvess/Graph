import { prisma } from '../lib/prisma.js';
import { validateForgotPassword } from '../Utils/validation.js';
import { toastResponse } from '../Utils/toast.js';
import { sendPasswordResetEmail } from '../lib/email.js';
import crypto from 'crypto';

/**
 * Handler para solicitação de redefinição de senha
 * Gera um token único e envia email com magic link
 */
export async function handleForgotPassword(request, reply) {
  try {
    // Valida os dados recebidos
    const { email } = validateForgotPassword(request.body);

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Por segurança, sempre retorna sucesso mesmo que o email não exista
    // Isso evita que atacantes descubram quais emails estão cadastrados
    if (!user) {
      return reply.code(200).send(
        toastResponse('success', 'Email enviado',
          'Se este email estiver cadastrado, você receberá um link para redefinir sua senha.')
      );
    }

    // Invalida tokens anteriores não utilizados do usuário
    await prisma.passwordReset.updateMany({
      where: {
        userId: user.id,
        used: false,
        expiresAt: {
          gt: new Date()
        }
      },
      data: {
        used: true
      }
    });

    // Gera um token único e seguro
    const token = crypto.randomBytes(32).toString('hex');

    // Define expiração de 1 hora
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Cria registro de redefinição de senha
    await prisma.passwordReset.create({
      data: {
        token,
        expiresAt,
        userId: user.id
      }
    });

    // Monta a URL do magic link
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;

    // Envia o email
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl
    });

    // Registra a ação no log
    await prisma.log.create({
      data: {
        action: 'PASSWORD_RESET_REQUESTED',
        details: `Solicitação de redefinição de senha para ${email}`,
        ip: request.ip,
        userId: user.id
      }
    });

    return reply.code(200).send(
      toastResponse('success', 'Email enviado',
        'Enviamos um link de redefinição de senha para seu email. Verifique sua caixa de entrada.')
    );

  } catch (error) {
    console.error('Erro ao processar forgot password:', error);

    // Se for erro de validação do Zod
    if (error.name === 'ZodError') {
      return reply.code(400).send(
        toastResponse('error', 'Dados inválidos', error.errors[0].message)
      );
    }

    // Erro genérico
    return reply.code(500).send(
      toastResponse('error', 'Erro no servidor',
        'Não foi possível processar sua solicitação. Tente novamente.')
    );
  }
}
