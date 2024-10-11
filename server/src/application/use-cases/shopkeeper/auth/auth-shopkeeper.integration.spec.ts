import { AuthShopKeeperUseCase } from './auth-shopkeeper.use-case'
import BcryptAdapter from '@infra/encrypt/bcrypt'
import { JwtAdapter } from '@infra/jwt/jwt'
import ShopKeeperRepository from '@infra/repositories/shopkeeper/shop-keeper.repository'
import { prisma } from '@infra/database/prisma/constants'
import { randomUUID } from 'crypto'

describe('AuthShopKeeperUseCase Integration Tests', () => {
  const shopKeeperRepo = new ShopKeeperRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter()

  const authShopKeeperUseCase = new AuthShopKeeperUseCase(
    shopKeeperRepo,
    bcryptAdapter,
    jwtAdapter,
  )

  beforeAll(async () => {
    await prisma.$connect()

    const hashedPassword = await bcryptAdapter.hash('St0ngP4ssw0rd')

    await prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'Luis Fernando',
        email: 'contract_expired_test@example.com',
        cpf: '46492983696',
        password: hashedPassword,
        rg: '987654321',
        contract: {
          create: {
            startDate: new Date('2023-04-01'),
            endDate: new Date('2023-05-01'),
            value: 2000,
          },
        },
      },
    })

    await prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'Luis Fernando',
        email: 'signature_expired_test@example.com',
        cpf: '19741869037',
        password: hashedPassword,
        rg: '123456789',
        signature: {
          create: {
            startDate: new Date('2023-04-01'),
            value: 50,
            endDate: new Date('2023-05-01'),
            plan: 'BASIC',
          },
        },
      },
    })

    const currentDate = new Date()
    const nextYear = currentDate.getUTCFullYear() + 1
    const endDate = new Date(Date.UTC(nextYear, 0, 1))

    await prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'Luis Fernando',
        email: 'valid_contract_test@example.com',
        cpf: '71171614691',
        password: hashedPassword,
        rg: '231334312',
        contract: {
          create: {
            startDate: currentDate,
            endDate: endDate,
            value: 2000,
          },
        },
      },
    })
  })

  afterAll(async () => {
    await prisma.contract.deleteMany()
    await prisma.signature.deleteMany()
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

  it('Should throw an error if ShopKeeper does not exist', async () => {
    await expect(
      authShopKeeperUseCase.execute({
        email: 'non_existing_test@example.com',
        password: 'St0ngP4ssw0rd',
      }),
    ).rejects.toThrow('Invalid Email or Password')
  })

  it('Should throw an error if Email or Password is invalid', async () => {
    await expect(
      authShopKeeperUseCase.execute({
        email: 'contract_expired_test@example.com',
        password: 'WrongPassword',
      }),
    ).rejects.toThrow('Invalid Email or Password')
  })

  it('Should throw an error if ShopKeeper Contract is expired', async () => {
    await expect(
      authShopKeeperUseCase.execute({
        email: 'contract_expired_test@example.com',
        password: 'St0ngP4ssw0rd',
      }),
    ).rejects.toThrow('Contract Expired')
  })

  it('Should throw an error if ShopKeeper Signature is expired', async () => {
    await expect(
      authShopKeeperUseCase.execute({
        email: 'signature_expired_test@example.com',
        password: 'St0ngP4ssw0rd',
      }),
    ).rejects.toThrow('Signature Expired')
  })

  it('Should authenticate a ShopKeeper with valid contract', async () => {
    const output = await authShopKeeperUseCase.execute({
      email: 'valid_contract_test@example.com',
      password: 'St0ngP4ssw0rd',
    })

    expect(output).toBeTruthy()
    expect(output.token).toBeTruthy()
    expect(output.user.email).toBe('valid_contract_test@example.com')
  })
})
