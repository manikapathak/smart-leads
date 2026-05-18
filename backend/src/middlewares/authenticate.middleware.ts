import {NextFunction, Request, Response} from 'express';

import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: string;
}

const authMiddleware = ( req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error(
        'Authorization token missing'
      );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error(
        'Invalid authorization format'
      );
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    next(
      new Error(
        'Unauthorized access'
      )
    );
  }
};

export default authMiddleware;