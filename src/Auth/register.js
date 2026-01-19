import bcrypt from 'bcrypt';
import he from 'he';
import { prisma } from '../lib/prisma.js';
import { registerSchema } from '../Utils/validation.js';
import { toastResponse, formatZodToToast } from '../Utils/toast.js';

export async function handleRegister(request, reply) {
  try {
    // 1. Coleta de Dados do Cliente para Log
    const clientIp = request.ip;
    const userAgent = request.headers['user-agent'];

    // 2. Validação de Schema
    const data = registerSchema.parse(request.body);

    // 3. Verificação de Usuário Existente
    const userExists = await prisma.user.findUnique({ where: { email: data.email } });
    if (userExists) {
      return reply.status(400).send(toastResponse('warning', 'Atenção', 'Este e-mail já está em uso.'));
    }

    // 4. Hash e Persistência
    const passwordHash = await bcrypt.hash(data.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: he.encode(data.name),
        email: data.email,
        passwordHash,
        role: 'USER'
      }
    });

    // 5. Log Detalhado (Auditoria)
    await prisma.log.create({
      data: {
        action: 'USER_REGISTER_SUCCESS',
        details: `IP: ${clientIp} | Device: ${userAgent}`,
        userId: newUser.id
      }
    });

    return reply.status(201).send(toastResponse('success', 'Sucesso!', 'Sua conta foi criada com segurança.'));

  } catch (error) {
    if (error.name === 'ZodError') {
      return reply.status(400).send(formatZodToToast(error));
    }

    // Log de erro interno para o desenvolvedor
    request.log.error(error);
    return reply.status(500).send(toastResponse('error', 'Erro Crítico', 'Falha interna no servidor.'));
  }
}