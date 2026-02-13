import { prisma } from '../prisma';
import {
  CreateAnimalData,
  IAnimalRepository,
  UpdateAnimalData,
} from '../../../domain/repositories/IAnimalRepository';
import { Animal } from '../../../domain/entities/Animal';

export class PrismaAnimalRepository implements IAnimalRepository {
  async create(data: CreateAnimalData): Promise<Animal> {
    return prisma.animal.create({ data });
  }

  async findById(id: string): Promise<Animal | null> {
    return prisma.animal.findUnique({ where: { id } });
  }

  async listAll(): Promise<Animal[]> {
    return prisma.animal.findMany();
  }

  async listByTutorId(tutorId: string): Promise<Animal[]> {
    return prisma.animal.findMany({ where: { tutorId } });
  }

  async countByTutorId(tutorId: string): Promise<number> {
    return prisma.animal.count({ where: { tutorId } });
  }

  async update(id: string, data: UpdateAnimalData): Promise<Animal> {
    return prisma.animal.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.animal.delete({ where: { id } });
  }
}
