export interface Tutor {
  id: string;
  nome: string;
  telefone: string;
  email?: string | null;
  endereco?: string | null;
  createdAt: Date;
}
