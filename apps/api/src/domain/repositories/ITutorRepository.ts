import { Tutor } from '../entities/Tutor';
import { Animal } from '../entities/Animal';

export type CreateTutorData = {
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
};

export type UpdateTutorData = Partial<CreateTutorData>;

export type TutorWithAnimals = Tutor & { animais: Animal[] };

export interface ITutorRepository {
  create(data: CreateTutorData): Promise<Tutor>;
  findById(id: string): Promise<Tutor | null>;
  findByEmail(email: string): Promise<Tutor | null>;
  listAll(): Promise<Tutor[]>;
  listAllWithAnimals(): Promise<TutorWithAnimals[]>;
  update(id: string, data: UpdateTutorData): Promise<Tutor>;
  delete(id: string): Promise<void>;
}
