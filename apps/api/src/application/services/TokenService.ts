import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenService {
  sign(payload: object, subject: string): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      subject,
      expiresIn: '1d',
    });
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  }
}
