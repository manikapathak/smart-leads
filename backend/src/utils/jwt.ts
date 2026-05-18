import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;

const JWT_EXPIRES_IN: SignOptions['expiresIn'] =
  process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'];

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (
  token: string
): string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};
