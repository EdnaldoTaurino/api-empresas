import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import type { Request, Response, Express } from 'express';
import type { INestApplication } from '@nestjs/common';

// Declarar tipo em global para uso com Vercel
declare global {
  // eslint-disable-next-line no-var
  var nestApp: INestApplication | undefined;
}

const logger = new Logger('Main');

export const createNestServer = async (req: Request, res: Response) => {
  try {
    if (!global.nestApp) {
      logger.log('Inicializando aplicação NestJS...');
      const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
        bodyParser: true,
      });
      app.enableCors();
      await app.init();
      global.nestApp = app;

      try {
        const connection = app.get<Connection>(getConnectionToken());
        logger.log(`Estado da conexão MongoDB: ${connection.readyState}`);
      } catch (error) {
        logger.error('Erro ao verificar conexão com MongoDB:', error);
      }
    }

    // Processar a requisição com a instância do NestJS
    const app = global.nestApp;
    const expressInstance = app.getHttpAdapter().getInstance() as Express;
    return expressInstance(req, res) as Promise<Response>;
  } catch (error) {
    logger.error('Erro ao processar requisição:', error);
    res.status(500).send('Erro interno do servidor');
  }
};

// Função bootstrap para desenvolvimento local
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  try {
    const connection = app.get<Connection>(getConnectionToken());
    if (connection.readyState === mongoose.ConnectionStates.connected) {
      logger.log('✅ MongoDB conectado com sucesso!');
    } else {
      logger.warn(
        `⚠️ MongoDB não está conectado. Estado: ${connection.readyState}`,
      );
    }
  } catch (error) {
    logger.error('❌ Erro ao verificar conexão com MongoDB:', error);
  }

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 Aplicação rodando na porta: ${process.env.PORT ?? 3000}`);
}

// Executar bootstrap apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  bootstrap().catch((err) => {
    logger.error('❌ Erro ao iniciar aplicação:', err);
    process.exit(1);
  });
}

export default createNestServer;
