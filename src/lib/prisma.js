import { PrismaClient } from '@prisma/client';

// Instanciamos o Prisma Client
export const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
});

// Verificação de saúde da conexão
async function checkDbConnection() {
  try {
    await prisma.$connect();
    console.log("[Postgres]: Conexão estabelecida com sucesso!");
  } catch (error) {
    console.error("[Postgres]: Falha crítica na conexão:");
    console.error(error);
    process.exit(1); 
  }
}

checkDbConnection();