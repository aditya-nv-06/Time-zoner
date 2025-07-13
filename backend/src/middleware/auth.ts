import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authSecret = process.env.AUTH_SECRET;

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!authSecret) {
    res.status(500).json({ error: 'AUTH_SECRET is not set in environment variables' });
    return;
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided or malformed header' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  } 
  jwt.verify(token, authSecret, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Failed to authenticate token' });
      return;
    }

    req.user = decoded;
    next();
  });
};

export { auth };

