import { Response, Router } from 'express';
import { PrismaAnimalRepository } from '../../infra/database/repositories/PrismaAnimalRepository';
import { PrismaTutorRepository } from '../../infra/database/repositories/PrismaTutorRepository';
import { CreateAnimalUseCase } from '../../application/usecases/CreateAnimalUseCase';
import { ListAnimalsUseCase } from '../../application/usecases/ListAnimalsUseCase';
import { AppError } from '../../application/errors/AppError';

const router = Router();

const animalRepo = new PrismaAnimalRepository();
const tutorRepo = new PrismaTutorRepository();
const createAnimalUseCase = new CreateAnimalUseCase(animalRepo, tutorRepo);
const listAnimalsUseCase = new ListAnimalsUseCase(animalRepo);

const handleError = (res: Response, error: unknown) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'internal server error' });
};

router.post('/', async (req, res) => {
  try {
    const animal = await createAnimalUseCase.execute(req.body);
    return res.status(201).json(animal);
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/', async (req, res) => {
  try {
    const tutorId = req.query.tutorId ? String(req.query.tutorId) : undefined;
    const animals = await listAnimalsUseCase.execute(tutorId);
    return res.json(animals);
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;
