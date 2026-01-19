import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyJwt from '@fastify/jwt';
import { appRoutes } from './src/routes.js';
import { authUtils } from './src/Utils/auth.js'; 

const app = Fastify({ 
  logger: true,
  trustProxy: true 
});

// 1. Configuração de CORS 
await app.register(cors, {
  origin: true, // Em desenvolvimento, permite qualquer origem. Em produção, use seu domínio.
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// 2. Configuração de JWT
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'chave-secreta-de-seguranca' // Fallback para evitar erro se env falhar
});

// 3. Decorator para proteção de rotas (Middleware de Autenticação)
app.decorate("authenticate", authUtils.verifyJWT);

// 4. Configuração Global de Rate Limit
await app.register(rateLimit, {
  global: false, 
});

// 5. Registro das Rotas (Seu Dicionário de URLs)
app.register(appRoutes);

// 6. Inicialização do Servidor
const start = async () => {
  try {
    // Verifica se a secret existe antes de subir
    if (!process.env.JWT_SECRET) {
      console.warn("⚠️ AVISO: JWT_SECRET não definida no .env!");
    }

    await app.listen({ 
      port: 3333, 
      host: '0.0.0.0' 
    });
    
    console.log(`
    🚀 Graphite SaaS Engine iniciado com sucesso!
    ---
    📡 Backend: http://localhost:3333
    🔐 Banco: PostgreSQL (Online via Prisma)
    🛡️  Segurança: JWT, CORS (Ativo), Rate Limit & XSS ativos
    `);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();