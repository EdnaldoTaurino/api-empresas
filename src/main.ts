import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { Express } from 'express';

const logger = new Logger('Main');
// Para ambiente de produção (Vercel)
export const createNestServer = async (): Promise<Express> => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableCors();

  // Verificar conexão com MongoDB em ambiente de produção
  try {
    const connection = app.get<Connection>(getConnectionToken());
    logger.log(`MongoDB connection state: ${connection.readyState}`);
  } catch (error) {
    logger.error('Error checking MongoDB connection:', error);
  }
  // Não é necessário chamar app.listen() em ambiente serverless
  await app.init();
  return app.getHttpAdapter().getInstance() as Express;
};

// Para ambiente de desenvolvimento local
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Obter a conexão MongoDB do container NestJS
  const connection = app.get<Connection>(getConnectionToken());

  // Verificar o estado da conexão
  console.log(`🔍 Estado da conexão MongoDB: ${connection.readyState}`);
  if (connection.readyState === mongoose.ConnectionStates.connected) {
    console.log('✅ MongoDB conectado com sucesso!');
  } else {
    console.log(
      '⚠️ MongoDB não está conectado. Estado:',
      connection.readyState,
    );
  }

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Aplicação rodando na porta: ${process.env.PORT ?? 3000}`);
}

// Executar apenas para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  bootstrap().catch((err) => {
    console.error('❌ Erro ao iniciar a aplicação:', err);
    process.exit(1);
  });
}

// Exportar para Vercel
export default createNestServer;
