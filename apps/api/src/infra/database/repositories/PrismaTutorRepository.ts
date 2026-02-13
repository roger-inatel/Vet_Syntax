import { prisma } from '../prisma';
import {
  CreateTutorData,
  ITutorRepository,
  TutorWithAnimals,
  UpdateTutorData,
} from '../../../domain/repositories/ITutorRepository';
import { Tutor } from '../../../domain/entities/Tutor';

export class PrismaTutorRepository implements ITutorRepository {
  async create(data: CreateTutorData): Promise<Tutor> {
    return prisma.tutor.create({ data });
  }

  async findById(id: string): Promise<Tutor | null> {
    return prisma.tutor.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Tutor | null> {
    return prisma.tutor.findFirst({ where: { email } });
  }

  async listAll(): Promise<Tutor[]> {
    return prisma.tutor.findMany();
  }

  async listAllWithAnimals(): Promise<TutorWithAnimals[]> {
    return prisma.tutor.findMany({ include: { animais: true } });
  }

  async update(id: string, data: UpdateTutorData): Promise<Tutor> {
    return prisma.tutor.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.tutor.delete({ where: { id } });
  }
}
