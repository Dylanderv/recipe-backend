import { Request } from 'koa';
import { verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../env';

export function koaAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === 'jwt') {
    const token = request.headers['authorization'];
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"))
      }
      verify(token, ACCESS_TOKEN_SECRET, function (err: any, decoded: any) {
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