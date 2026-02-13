import { IAdminRepository } from '../../../domain/repositories/IAdminRepository';
import { HashService } from '../../services/HashService';
import { TokenService } from '../../services/TokenService';
import { AppError } from '../../errors/AppError';

export class LoginUseCase {
  constructor(
    private adminRepo: IAdminRepository,
    private hashService: HashService,
    private tokenService: TokenService,
  ) {}

  async execute(email: string, password: string) {
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    if (!normalizedEmail || !normalizedPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const admin = await this.adminRepo.findByEmail(normalizedEmail);
    if (!admin) {
      throw new AppError('Invalid credentials', 401);
    }

    const valid = await this.hashService.compare(
      normalizedPassword,
      admin.passwordHash,
    );
    if (!valid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.tokenService.sign({ role: admin.role }, admin.id);

    return { token };
  }
}
