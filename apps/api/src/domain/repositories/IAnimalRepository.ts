import { Animal } from '../entities/Animal';

export type CreateAnimalData = {
  nome: string;
  especie: string;
  raca?: string;
  idade?: number;
  peso?: number;
  tutorId: string;
};

export type UpdateAnimalData = Partial<CreateAnimalData>;

export interface IAnimalRepository {
  create(data: CreateAnimalData): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  listAll(): Promise<Animal[]>;
  listByTutorId(tutorId: string): Promise<Animal[]>;
  countByTutorId(tutorId: string): Promise<number>;
  update(id: string, data: UpdateAnimalData): Promise<Animal>;
  delete(id: string): Promise<void>;
}
