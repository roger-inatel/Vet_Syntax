import { prisma } from '../prisma';
import { Admin } from '../../../domain/entities/Admin';
import { IAdminRepository } from '../../../domain/repositories/IAdminRepository';

export class PrismaAdminRepository implements IAdminRepository {
  async create(data: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
    const admin = await prisma.admin.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
      },
    });

    return new Admin(
      admin.id,
      admin.email,
      admin.passwordHash,
      admin.role,
      admin.createdAt,
    );
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return null;
    }

    return new Admin(
      admin.id,
      admin.email,
      admin.passwordHash,
      admin.role,
      admin.createdAt,
    );
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      return null;
    }

    return new Admin(
      admin.id,
      admin.email,
      admin.passwordHash,
      admin.role,
      admin.createdAt,
    );
  }
}
