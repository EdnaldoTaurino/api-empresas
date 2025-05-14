import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Empresa } from './schemas/empresa.schema';
import { EntidadeRegistro } from './schemas/entidade-registro.schema';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { CreateEntidadeRegistroDto } from './dto/create-entidade.dto';
import { v4 } from 'uuid';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectModel(Empresa.name) private empresaModel: Model<Empresa>,
    @InjectModel(EntidadeRegistro.name)
    private entidadeModel: Model<EntidadeRegistro>,
  ) {}

  // Métodos para Empresas
  async findAll(): Promise<Empresa[]> {
    return this.empresaModel.find().exec();
  }

  async findOne(id: string): Promise<Empresa> {
    const empresa = await this.empresaModel.findOne({ id }).exec();
    if (!empresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
    return empresa;
  }

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    // Gerar ID se não fornecido
    if (!createEmpresaDto.id) {
      createEmpresaDto.id = v4();
    }

    // Definir data de criação se não fornecida
    if (!createEmpresaDto.dataCriacao) {
      createEmpresaDto.dataCriacao = new Date().toISOString();
    }

    const newEmpresa = new this.empresaModel(createEmpresaDto);
    return newEmpresa.save();
  }

  async update(
    id: string,
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    const updatedEmpresa = await this.empresaModel
      .findOneAndUpdate({ id }, updateEmpresaDto, { new: true })
      .exec();

    if (!updatedEmpresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }

    return updatedEmpresa;
  }

  async remove(id: string): Promise<Empresa> {
    const deletedEmpresa = await this.empresaModel
      .findOneAndDelete({ id })
      .exec();

    if (!deletedEmpresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }

    return deletedEmpresa;
  }

  // Métodos para Entidades de Registro
  async findAllEntidades(): Promise<EntidadeRegistro[]> {
    return this.entidadeModel.find().exec();
  }

  async findEntidadeById(id: string): Promise<EntidadeRegistro> {
    const entidade = await this.entidadeModel.findOne({ id }).exec();

    if (!entidade) {
      throw new NotFoundException(
        `Entidade de registro com ID ${id} não encontrada`,
      );
    }

    return entidade;
  }

  async createEntidade(
    createEntidadeDto: CreateEntidadeRegistroDto,
  ): Promise<EntidadeRegistro> {
    const newEntidade = new this.entidadeModel(createEntidadeDto);
    return newEntidade.save();
  }

  async removeEntidade(id: string): Promise<EntidadeRegistro> {
    const deletedEntidade = await this.entidadeModel
      .findOneAndDelete({ id })
      .exec();

    if (!deletedEntidade) {
      throw new NotFoundException(
        `Entidade de registro com ID ${id} não encontrada`,
      );
    }

    return deletedEntidade;
  }
}
