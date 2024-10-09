import { randomUUID } from 'node:crypto'
import CPF from '../entities/user/cpf'
import Email from '../entities/user/email'
import { Password } from '../entities/user/password'
import RG from '../entities/user/rg'
import ShopKeeper from '../entities/user/shop-keeper.entity'
import Signature, { SignaturePlanEnum } from '../entities/user/signature'
import Usermame from '../entities/user/username'
import { ShopKeeperService } from './shop-keeper.service'

describe('ShopKeeperService unit unit tests', () => {
  it('Should add a starter signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2024-03-01')
    const shopKeeper = new ShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 1'),
      signature: new Signature(SignaturePlanEnum.STARTER, signatureStartDate),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    ShopKeeperService.signaturePeriod(shopKeeper)

    expect(shopKeeper.signature).toBeTruthy()

    if (shopKeeper.signature) {
      expect(signatureEndDate).toStrictEqual(shopKeeper.signature.endDate)
    }
  })

  it('Should add a basic signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2024-08-01')
    const shopKeeper = new ShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 2'),
      signature: new Signature(SignaturePlanEnum.BASIC, signatureStartDate),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    ShopKeeperService.signaturePeriod(shopKeeper)

    expect(shopKeeper.signature).toBeTruthy()

    if (shopKeeper.signature) {
      expect(signatureEndDate).toStrictEqual(shopKeeper.signature.endDate)
    }
  })

  it('Should add a premium signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2025-02-01')
    const shopKeeper = new ShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 3'),
      signature: new Signature(SignaturePlanEnum.PREMIUM, signatureStartDate),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    ShopKeeperService.signaturePeriod(shopKeeper)

    if (shopKeeper.signature) {
      expect(signatureEndDate).toStrictEqual(shopKeeper.signature.endDate)
    }
  })
})
