export interface Animal {
  id: string;
  nome: string;
  especie: string; // cachorro, gato, etc
  raca?: string | null;
  idade?: number | null;
  peso?: number | null;
  tutorId: string;
  createdAt: Date;
}
