import { ITutorRepository } from '../../domain/repositories/ITutorRepository';
import { Tutor } from '../../domain/entities/Tutor';
import { AppError } from '../errors/AppError';

export class GetTutorByIdUseCase {
  constructor(private tutorRepo: ITutorRepository) {}

  async execute(id: string): Promise<Tutor> {
    const tutor = await this.tutorRepo.findById(id);

    if (!tutor) {
      throw new AppError('tutor not found', 404);
    }

    return tutor;
  }
}
