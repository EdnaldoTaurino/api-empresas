import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEntidadeRegistroDto } from './dto/create-entidade.dto';

@Controller('entidades-registro')
export class EntidadesController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Get()
  findAll() {
    return this.empresasService.findAllEntidades();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findEntidadeById(id);
  }

  @Post()
  create(@Body() createEntidadeDto: CreateEntidadeRegistroDto) {
    return this.empresasService.createEntidade(createEntidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasService.removeEntidade(id);
  }
}
