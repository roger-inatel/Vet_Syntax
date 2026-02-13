import { Request, Response } from 'express';
import { PrismaAdminRepository } from '../../../infra/database/repositories/PrismaAdminRepository';
import { HashService } from '../../../application/services/HashService';
import { CreateAdminUseCase } from '../../../application/usecases/auth/CreateAdminUseCase';
import { AppError } from '../../../application/errors/AppError';

export class CreateAdminController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const repo = new PrismaAdminRepository();
      const hashService = new HashService();
      const useCase = new CreateAdminUseCase(repo, hashService);

      const admin = await useCase.execute(email, password);
      return res.status(201).json(admin);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error(error);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
