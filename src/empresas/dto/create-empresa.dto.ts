export class EnderecoEmpresaDto {
  co_cep: number;
  ds_logradouro: string;
  co_numero: string;
  ds_complemento?: string;
  ds_bairro: string;
  ds_municipio: string;
  co_uf: string;
}

export class DadosEmpresaDto {
  ds_nome_fantasia: string;
  co_entidade_registro: number;
  co_natureza_juridica: number;
  endereco: EnderecoEmpresaDto;
}

export class SolicitanteDto {
  ds_responsavel: string;
  nu_cpf: string;
  date_nascimento: string;
}

export class CreateEmpresaDto {
  id?: string;
  solicitante?: SolicitanteDto;
  empresa?: DadosEmpresaDto;
  nome?: string;
  cnpj?: string;
  endereco?: string;
  estado?: string;
  status?: string;
  dataCriacao?: string;
}
