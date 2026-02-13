import { ITutorRepository } from '../../domain/repositories/ITutorRepository';
import { IAnimalRepository } from '../../domain/repositories/IAnimalRepository';
import { AppError } from '../errors/AppError';

export class DeleteTutorUseCase {
  constructor(
    private tutorRepo: ITutorRepository,
    private animalRepo: IAnimalRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.tutorRepo.findById(id);

    if (!existing) {
      throw new AppError('tutor not found', 404);
    }

    const animalCount = await this.animalRepo.countByTutorId(id);
    if (animalCount > 0) {
      throw new AppError('tutor has animals', 409);
    }

    await this.tutorRepo.delete(id);
  }
}
