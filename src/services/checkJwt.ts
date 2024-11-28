import { NextFunction, Request, Response } from 'express';
import { GetVerificationKey, expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) =>
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }) as GetVerificationKey,
    audience: process.env.AUTH0_CLIENT_ID,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
  })(req, res, next) as Promise<void>;
