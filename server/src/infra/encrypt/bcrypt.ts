import EncryptContract from '@application/contracts/encrypt.interface'
import * as bcrypt from 'bcrypt'

export default class BcryptAdapter extends EncryptContract {
  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword)
  }
  async hash(password: string, salt = 16): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
