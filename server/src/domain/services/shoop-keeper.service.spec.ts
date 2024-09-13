import Store from '@domain/entities/store/store.entity'
import CPF from '@domain/entities/user/cpf'
import Email from '@domain/entities/user/email'
import { Password } from '@domain/entities/user/password'
import RG from '@domain/entities/user/rg'
import ShopKeeper from '@domain/entities/user/shoop-keeper.entity'
import Signature, { SignaturePlanEnum } from '@domain/entities/user/signature'
import Usermame from '@domain/entities/user/username'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { ShoopKeeperService } from './shoop-keeper.service'

describe('ShopKeeperService unit unit tests', () => {
  const shoopKeeperService = new ShoopKeeperService()
  it('Should add a starter signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2024-03-01')
    const shoopKeeper = new ShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 1'),
      signature: new Signature(SignaturePlanEnum.STARTER, signatureStartDate),
      store: new Store('1'),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    shoopKeeperService.signaturePeriod(shoopKeeper)

    expect(signatureEndDate).toStrictEqual(shoopKeeper.signature.endDate)
  })

  it('Should add a basic signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2024-08-01')
    const shoopKeeper = new ShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 2'),
      signature: new Signature(SignaturePlanEnum.BASIC, signatureStartDate),
      store: new Store('1'),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    shoopKeeperService.signaturePeriod(shoopKeeper)

    expect(signatureEndDate).toStrictEqual(shoopKeeper.signature.endDate)
  })

  it('Should add a premium signature period', () => {
    const signatureStartDate = new Date('2024-02-01')
    const signatureEndDate = new Date('2025-02-01')
    const shoopKeeper = new ShopKeeper({
      id: randomUUID(),
      name: new Usermame('Luis 3'),
      signature: new Signature(SignaturePlanEnum.PREMIUM, signatureStartDate),
      store: new Store('1'),
      cpf: new CPF('63067078080'),
      password: new Password('S3curityP@ssw0rd'),
      email: new Email('teste@email.com'),
      rg: new RG('435144820'),
    })

    shoopKeeperService.signaturePeriod(shoopKeeper)

    expect(signatureEndDate).toStrictEqual(shoopKeeper.signature.endDate)
  })
})
