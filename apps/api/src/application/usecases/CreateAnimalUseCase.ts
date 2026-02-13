import {
  CreateAnimalData,
  IAnimalRepository,
} from '../../domain/repositories/IAnimalRepository';
import { ITutorRepository } from '../../domain/repositories/ITutorRepository';
import { Animal } from '../../domain/entities/Animal';
import { AppError } from '../errors/AppError';

const normalizeOptional = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export class CreateAnimalUseCase {
  constructor(
    private animalRepo: IAnimalRepository,
    private tutorRepo: ITutorRepository,
  ) {}

  async execute(input: CreateAnimalData): Promise<Animal> {
    const nome = normalizeOptional(input.nome);
    const especie = normalizeOptional(input.especie);
    const raca = normalizeOptional(input.raca);

    if (!nome) {
      throw new AppError('nome is required');
    }

    if (!especie) {
      throw new AppError('especie is required');
    }

    if (!input.tutorId) {
      throw new AppError('tutorId is required');
    }

    if (input.idade !== undefined && input.idade < 0) {
      throw new AppError('idade must be a positive number');
    }

    if (input.peso !== undefined && input.peso <= 0) {
      throw new AppError('peso must be a positive number');
    }

    const tutor = await this.tutorRepo.findById(input.tutorId);
    if (!tutor) {
      throw new AppError('tutor not found', 404);
    }

    return this.animalRepo.create({
      nome,
      especie,
      raca,
      idade: input.idade,
      peso: input.peso,
      tutorId: input.tutorId,
    });
  }
}
