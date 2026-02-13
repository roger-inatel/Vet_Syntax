import { Response, Router } from 'express';
import { PrismaTutorRepository } from '../../infra/database/repositories/PrismaTutorRepository';
import { CreateTutorUseCase } from '../../application/usecases/CreateTutorUseCase';
import { ListTutoresUseCase } from '../../application/usecases/ListTutoresUseCase';
import { AppError } from '../../application/errors/AppError';

const router = Router();

const tutorRepo = new PrismaTutorRepository();
const createTutorUseCase = new CreateTutorUseCase(tutorRepo);
const listTutoresUseCase = new ListTutoresUseCase(tutorRepo);

const handleError = (res: Response, error: unknown) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'internal server error' });
};

router.post('/', async (req, res) => {
  try {
    const tutor = await createTutorUseCase.execute(req.body);
    return res.status(201).json(tutor);
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/', async (_req, res) => {
  try {
    const tutors = await listTutoresUseCase.execute();
    return res.json(tutors);
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;
