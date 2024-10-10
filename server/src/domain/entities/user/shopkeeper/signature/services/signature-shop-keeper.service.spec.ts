import { randomUUID } from 'crypto'
import SignatureShopKeeper from '../signature-shop-keeper.entity'
import Usermame from '@domain/entities/user/username'
import Signature, { SignaturePlanEnum } from '../signature'
import CPF from '@domain/entities/user/cpf'
import { Password } from '@domain/entities/user/password'
import Email from '@domain/entities/user/email'
import RG from '@domain/entities/user/rg'
import { SignatureShopKeeperService } from './signature-shop-keeper.service'
describe('SignatureShopKeeperService unit unit tests', () => {
  it('Should add a starter signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2024-03-01')
    const shopKeeper = new SignatureShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 1'),
      signature: new Signature(SignaturePlanEnum.STARTER, signatureStartDate),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    SignatureShopKeeperService.signaturePeriod(shopKeeper)

    expect(shopKeeper.signature).toBeTruthy()

    if (shopKeeper.signature) {
      expect(signatureEndDate).toStrictEqual(shopKeeper.signature.endDate)
    }
  })

  it('Should add a basic signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2024-08-01')
    const shopKeeper = new SignatureShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 2'),
      signature: new Signature(SignaturePlanEnum.BASIC, signatureStartDate),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    SignatureShopKeeperService.signaturePeriod(shopKeeper)

    expect(shopKeeper.signature).toBeTruthy()

    if (shopKeeper.signature) {
      expect(signatureEndDate).toStrictEqual(shopKeeper.signature.endDate)
    }
  })

  it('Should add a premium signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2025-02-01')
    const shopKeeper = new SignatureShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 3'),
      signature: new Signature(SignaturePlanEnum.PREMIUM, signatureStartDate),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    SignatureShopKeeperService.signaturePeriod(shopKeeper)

    expect(signatureEndDate).toStrictEqual(shopKeeper.signature.endDate)
  })
})
