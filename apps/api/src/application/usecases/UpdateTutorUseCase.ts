import {
  ITutorRepository,
  UpdateTutorData,
} from '../../domain/repositories/ITutorRepository';
import { Tutor } from '../../domain/entities/Tutor';
import { AppError } from '../errors/AppError';

const normalizeOptional = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export class UpdateTutorUseCase {
  constructor(private tutorRepo: ITutorRepository) {}

  async execute(id: string, data: UpdateTutorData): Promise<Tutor> {
    const existing = await this.tutorRepo.findById(id);

    if (!existing) {
      throw new AppError('tutor not found', 404);
    }

    const nome = normalizeOptional(data.nome);
    const telefone = normalizeOptional(data.telefone);
    const email = normalizeOptional(data.email)?.toLowerCase();
    const endereco = normalizeOptional(data.endereco);

    if (!nome && !telefone && !email && !endereco) {
      throw new AppError('no fields to update');
    }

    if (email) {
      const emailOwner = await this.tutorRepo.findByEmail(email);
      if (emailOwner && emailOwner.id !== id) {
        throw new AppError('email already in use', 409);
      }
    }

    return this.tutorRepo.update(id, { nome, telefone, email, endereco });
  }
}
