import { prisma } from '../prisma';
import {
  CreateAtendimentoData,
  IAtendimentoRepository,
} from '../../../domain/repositories/IAtendimentoRepository';
import { Atendimento } from '../../../domain/entities/Atendimento';

export class PrismaAtendimentoRepository implements IAtendimentoRepository {
  async create(data: CreateAtendimentoData): Promise<Atendimento> {
    return prisma.atendimento.create({ data });
  }

  async findById(id: string): Promise<Atendimento | null> {
    return prisma.atendimento.findUnique({ where: { id } });
  }

  async listByAnimalId(animalId: string): Promise<Atendimento[]> {
    return prisma.atendimento.findMany({ where: { animalId } });
  }
}
