import { Atendimento } from '../entities/Atendimento';

export type CreateAtendimentoData = {
  animalId: string;
  data: Date;
  descricao: string;
  tipoServico: string;
  valor: number;
};

export interface IAtendimentoRepository {
  create(data: CreateAtendimentoData): Promise<Atendimento>;
  findById(id: string): Promise<Atendimento | null>;
  listByAnimalId(animalId: string): Promise<Atendimento[]>;
}
