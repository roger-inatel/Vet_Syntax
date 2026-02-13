import { IAdminRepository } from '../../../domain/repositories/IAdminRepository';
import { HashService } from '../../services/HashService';
import { AppError } from '../../errors/AppError';

export class CreateAdminUseCase {
  constructor(
    private adminRepo: IAdminRepository,
    private hashService: HashService,
  ) {}

  async execute(email: string, password: string) {
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    if (!normalizedEmail) {
      throw new AppError('email is required');
    }

    if (!normalizedPassword || normalizedPassword.length < 6) {
      throw new AppError('password must be at least 6 characters');
    }

    const existing = await this.adminRepo.findByEmail(normalizedEmail);
    if (existing) {
      throw new AppError('Admin already exists', 409);
    }

    const passwordHash = await this.hashService.hash(normalizedPassword);

    return this.adminRepo.create({
      email: normalizedEmail,
      passwordHash,
      role: 'ADMIN',
    });
  }
}
