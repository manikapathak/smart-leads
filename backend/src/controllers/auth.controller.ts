import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';

const authController = {
  
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, email, password, name } = req.body;

      const result = await authService.register({
        username,
        email,
        password,
        name,
      });

      res.status(201).json(result);

    } catch (err: any) {

      if (err.validationErrors) {
        res.status(400).json({
          error: err.message,
          fields: err.validationErrors,
        });
        return;
      }

      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { username, password } = req.body;

      const result = await authService.login({
        username,
        password,
      });

      res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  },
};

export default authController;