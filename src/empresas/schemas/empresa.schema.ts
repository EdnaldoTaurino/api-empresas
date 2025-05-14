import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EnderecoEmpresa {
  @Prop()
  co_cep: number;

  @Prop()
  ds_logradouro: string;

  @Prop()
  co_numero: string;

  @Prop()
  ds_complemento: string;

  @Prop()
  ds_bairro: string;

  @Prop()
  ds_municipio: string;

  @Prop()
  co_uf: string;
}

@Schema()
export class DadosEmpresa {
  @Prop()
  ds_nome_fantasia: string;

  @Prop()
  co_entidade_registro: number;

  @Prop()
  co_natureza_juridica: number;

  @Prop({ type: EnderecoEmpresa })
  endereco: EnderecoEmpresa;
}

@Schema()
export class Solicitante {
  @Prop()
  ds_responsavel: string;

  @Prop()
  nu_cpf: string;

  @Prop()
  date_nascimento: string;
}

@Schema()
export class Empresa extends Document {
  @Prop({ required: true })
  declare id: string;

  @Prop({ type: Solicitante })
  solicitante?: Solicitante;

  @Prop({ type: DadosEmpresa })
  empresa?: DadosEmpresa;

  @Prop()
  nome?: string;

  @Prop()
  cnpj?: string;

  @Prop()
  endereco?: string;

  @Prop()
  estado?: string;

  @Prop()
  status?: string;

  @Prop()
  dataCriacao?: string;
}

export const EmpresaSchema = SchemaFactory.createForClass(Empresa);
