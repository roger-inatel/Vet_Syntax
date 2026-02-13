import { ITutorRepository, TutorWithAnimals } from '../../domain/repositories/ITutorRepository';

export class ListTutoresUseCase {
  constructor(private tutorRepo: ITutorRepository) {}

  async execute(): Promise<TutorWithAnimals[]> {
    return this.tutorRepo.listAllWithAnimals();
  }
}
