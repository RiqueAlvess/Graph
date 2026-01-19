import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { toastResponse } from '../Utils/toast.js';

const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido").toLowerCase().trim(),
  password: z.string().min(1, "A senha é obrigatória")
});

export async function handleLogin(request, reply) {
  try {
    // 1. Validar campos
    const { email, password } = loginSchema.parse(request.body);

    // 2. Buscar usuário (Incluindo role e plan)
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // 3. Segurança: Mensagem genérica para evitar descoberta de e-mails
    if (!user) {
      return reply.status(401).send(
        toastResponse('error', 'Falha no Login', 'E-mail ou senha incorretos.')
      );
    }

    // 4. Comparar Hash da senha
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return reply.status(401).send(
        toastResponse('error', 'Falha no Login', 'E-mail ou senha incorretos.')
      );
    }

    // 5. Gerar JWT com Payload completo
    const token = reply.jwtSign(
      { 
        id: user.id, 
        role: user.role, 
        plan: user.plan 
      },
      { expiresIn: '7d' } // Sessão válida por 1 semana
    );

    // 6. Log de Auditoria
    await prisma.log.create({
      data: {
        action: 'USER_LOGIN_SUCCESS',
        details: `IP: ${request.ip} | Plan: ${user.plan}`,
        userId: user.id
      }
    });

    // 7. Retorno para o Frontend (incluindo o objeto Toast e dados do usuário)
    return reply.status(200).send({
      ...toastResponse('success', 'Bem-vindo de volta!', `Logado como plano ${user.plan}`),
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send(
        toastResponse('error', 'Dados Inválidos', error.errors[0].message)
      );
    }
    
    request.log.error(error);
    return reply.status(500).send(
      toastResponse('error', 'Erro no Sistema', 'Não foi possível processar o login agora.')
    );
  }
}