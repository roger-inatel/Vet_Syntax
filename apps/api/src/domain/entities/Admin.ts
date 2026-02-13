export class Admin {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public role: string = 'ADMIN',
    public readonly createdAt: Date,
  ) {}
}
