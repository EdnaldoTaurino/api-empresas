import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Connection } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(
    private readonly empresasService: EmpresasService,
    @InjectConnection() private readonly connection: Connection,
  ) {}
  // Verifica o status da conexão com o banco de dados rota localhost:3000/empresas/status
  @Get('status')
  getDatabaseStatus() {
    return {
      status:
        this.connection.readyState === mongoose.ConnectionStates.connected
          ? 'connected'
          : 'disconnected',
      readyState: this.connection.readyState,
    };
  }

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasService.remove(id);
  }
}
