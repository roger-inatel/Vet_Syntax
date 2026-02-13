import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../../application/services/TokenService';

const tokenService = new TokenService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const payload = tokenService.verify(token) as {
      sub?: string;
      role?: string;
    };

    if (!payload.role) {
      return res.status(403).json({ message: 'missing role' });
    }

    if (payload.role !== 'ADMIN') {
      return res.status(403).json({ message: 'forbidden' });
    }

    req.user = {
      id: String(payload.sub || ''),
      role: String(payload.role || ''),
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
