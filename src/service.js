import bcrypt from 'bcrypt';
import he from 'he';
import { prisma } from './lib/prisma.js';
import { registerSchema } from './Utils/validation.js';
import { toastResponse, formatZodToToast } from './Utils/toast.js';

export const authService = {
  
  // LOGICA DE REGISTRO
  register: async (request, reply) => {
    try {
      const metadata = { ip: request.ip, userAgent: request.headers['user-agent'] };
      const data = registerSchema.parse(request.body);

      const userExists = await prisma.user.findUnique({ where: { email: data.email } });
      if (userExists) {
        return reply.status(400).send(toastResponse('warning', 'Atenção', 'Este e-mail já está em uso.'));
      }

      const passwordHash = await bcrypt.hash(data.password, 12);
      const sanitizedName = he.encode(data.name);

      await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { name: sanitizedName, email: data.email, passwordHash, role: 'USER' }
        });

        await tx.log.create({
          data: {
            action: 'USER_REGISTER_SUCCESS',
            details: `IP: ${metadata.ip} | Browser: ${metadata.userAgent}`,
            userId: user.id
          }
        });
      });

      return reply.status(201).send(toastResponse('success', 'Bem-vindo!', 'Sua conta foi criada com sucesso.'));

    } catch (error) {
      if (error.name === 'ZodError') return reply.status(400).send(formatZodToToast(error));
      request.log.error(error);
      return reply.status(500).send(toastResponse('error', 'Erro Interno', 'Falha ao registrar.'));
    }
  },

  // LOGICA DE LOGIN
  login: async (request, reply) => {
    try {
      const { email, password } = request.body;

      // 1. Busca o usuário
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return reply.status(401).send(toastResponse('error', 'Acesso Negado', 'E-mail ou senha inválidos.'));
      }

      // 2. Compara a senha (Bcrypt extrai o salt automaticamente do hash)
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return reply.status(401).send(toastResponse('error', 'Acesso Negado', 'E-mail ou senha inválidos.'));
      }

      // 3. Gera o Token JWT (Payload contém ID e Role para controle de acesso)
      const token = app.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: '7d' } 
      );

      // 4. Log de Login
      await prisma.log.create({
        data: {
          action: 'USER_LOGIN_SUCCESS',
          details: `IP: ${request.ip}`,
          userId: user.id
        }
      });

      // 5. Retorna sucesso + Token + Dados básicos do usuário
      return reply.status(200).send({
        ...toastResponse('success', 'Olá novamente!', 'Login realizado com sucesso.'),
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      request.log.error(error);
      return reply.status(500).send(toastResponse('error', 'Erro', 'Falha interna ao realizar login.'));
    }
  }
};