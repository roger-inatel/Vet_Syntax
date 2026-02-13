import { IAnimalRepository } from '../../domain/repositories/IAnimalRepository';
import { Animal } from '../../domain/entities/Animal';

export class ListAnimalsUseCase {
  constructor(private animalRepo: IAnimalRepository) {}

  async execute(tutorId?: string): Promise<Animal[]> {
    if (tutorId) {
      return this.animalRepo.listByTutorId(tutorId);
    }

    return this.animalRepo.listAll();
  }
}
