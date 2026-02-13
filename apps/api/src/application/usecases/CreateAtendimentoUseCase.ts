import {
  CreateAtendimentoData,
  IAtendimentoRepository,
} from '../../domain/repositories/IAtendimentoRepository';
import { IAnimalRepository } from '../../domain/repositories/IAnimalRepository';
import { Atendimento } from '../../domain/entities/Atendimento';
import { AppError } from '../errors/AppError';

export type CreateAtendimentoInput = Omit<CreateAtendimentoData, 'data'> & {
  data: Date | string;
};

const normalizeOptional = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export class CreateAtendimentoUseCase {
  constructor(
    private atendimentoRepo: IAtendimentoRepository,
    private animalRepo: IAnimalRepository,
  ) {}

  async execute(input: CreateAtendimentoInput): Promise<Atendimento> {
    if (!input.animalId) {
      throw new AppError('animalId is required');
    }

    const descricao = normalizeOptional(input.descricao);
    const tipoServico = normalizeOptional(input.tipoServico);

    if (!descricao) {
      throw new AppError('descricao is required');
    }

    if (!tipoServico) {
      throw new AppError('tipoServico is required');
    }

    if (input.valor <= 0) {
      throw new AppError('valor must be a positive number');
    }

    const data = input.data instanceof Date ? input.data : new Date(input.data);
    if (Number.isNaN(data.getTime())) {
      throw new AppError('data is invalid');
    }

    const animal = await this.animalRepo.findById(input.animalId);
    if (!animal) {
      throw new AppError('animal not found', 404);
    }

    return this.atendimentoRepo.create({
      animalId: input.animalId,
      data,
      descricao,
      tipoServico,
      valor: input.valor,
    });
  }
}
