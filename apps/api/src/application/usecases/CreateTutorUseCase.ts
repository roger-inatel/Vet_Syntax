import {
  CreateTutorData,
  ITutorRepository,
} from '../../domain/repositories/ITutorRepository';
import { Tutor } from '../../domain/entities/Tutor';
import { AppError } from '../errors/AppError';

const normalizeOptional = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export class CreateTutorUseCase {
  constructor(private tutorRepo: ITutorRepository) {}

  async execute(input: CreateTutorData): Promise<Tutor> {
    const nome = normalizeOptional(input.nome);
    const telefone = normalizeOptional(input.telefone);
    const email = normalizeOptional(input.email)?.toLowerCase();
    const endereco = normalizeOptional(input.endereco);

    if (!nome) {
      throw new AppError('nome is required');
    }

    if (!telefone) {
      throw new AppError('telefone is required');
    }

    if (email) {
      const existing = await this.tutorRepo.findByEmail(email);
      if (existing) {
        throw new AppError('email already in use', 409);
      }
    }

    return this.tutorRepo.create({ nome, telefone, email, endereco });
  }
}
