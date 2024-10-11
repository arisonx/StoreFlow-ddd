import JwtContract from '@application/contracts/jwt.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
export class JwtAdapter implements JwtContract {
  sign(payload: string | Buffer | object, secret: string) {
    return jwt.sign(payload, secret)
  }

  verify(token: string, secret: string): JwtPayload | unknown {
    try {
      const payload = jwt.verify(token, secret)
      return payload as JwtPayload
    } catch (err) {
      return err
    }
  }
}
