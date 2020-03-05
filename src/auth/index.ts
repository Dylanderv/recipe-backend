import { Request } from 'koa';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../env';

export function koaAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === 'jwt') {
    const token = request.headers['x-access-token'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"))
      }
      verify(token, JWT_SECRET, function (err: any, decoded: any) {
        if (err) {
          reject(err)
        } else {
          // Check if JWT contains all required scopes
          for (let scope of scopes) {
            if (!decoded.roles.includes(scope)) {
              reject(new Error("JWT does not contain required rolez."));
            }
          }
          resolve(decoded)
        }
      });
    });
  }
}