import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { Empresa, EmpresaSchema } from './schemas/empresa.schema';
import {
  EntidadeRegistro,
  EntidadeRegistroSchema,
} from './schemas/entidade-registro.schema';
import { EntidadesController } from './entidades.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Empresa.name, schema: EmpresaSchema },
      { name: EntidadeRegistro.name, schema: EntidadeRegistroSchema },
    ]),
  ],
  controllers: [EmpresasController, EntidadesController],
  providers: [EmpresasService],
})
export class EmpresasModule {}
