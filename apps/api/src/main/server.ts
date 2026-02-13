import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from '../presentation/routes/auth.routes';
import tutorRoutes from '../presentation/routes/tutor.routes';
import animalRoutes from '../presentation/routes/animal.routes';
import { authMiddleware } from '../presentation/middlewares/auth.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'vet-platform-api' });
});

app.use('/auth', authRoutes);
app.use('/tutors', authMiddleware, tutorRoutes);
app.use('/animals', authMiddleware, animalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
