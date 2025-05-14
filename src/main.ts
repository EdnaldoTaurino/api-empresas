import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';

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
bootstrap().catch((err) => {
  console.error('❌ Erro ao iniciar a aplicação:', err);
  process.exit(1);
});
