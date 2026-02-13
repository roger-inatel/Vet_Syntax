import { Request, Response } from 'express';
import { PrismaAdminRepository } from '../../../infra/database/repositories/PrismaAdminRepository';
import { HashService } from '../../../application/services/HashService';
import { TokenService } from '../../../application/services/TokenService';
import { LoginUseCase } from '../../../application/usecases/auth/LoginUseCase';
import { AppError } from '../../../application/errors/AppError';

export class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const repo = new PrismaAdminRepository();
      const hashService = new HashService();
      const tokenService = new TokenService();
      const useCase = new LoginUseCase(repo, hashService, tokenService);

      const result = await useCase.execute(email, password);
      return res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error(error);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
