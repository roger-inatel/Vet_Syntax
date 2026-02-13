import { Admin } from '../entities/Admin';

export interface IAdminRepository {
  create(data: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
}
