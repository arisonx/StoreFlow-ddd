import { IResourceListOutputProps } from '@domain/@shared/repositories/base-repo.interface'
import ShopKeeperFactory from '@domain/user/@shared/factories/shop-keeper.factory'
import ContractShopKeeper from '@domain/user/shopkeeper/contract/contract-shop-keeper.entity'
import IShopKeeperRepository, {
  IShopKeeperListInputProps,
} from '@domain/user/shopkeeper/repositories/shopkeeper-repository.abstract'
import { SignaturePlanEnum } from '@domain/user/shopkeeper/signature/signature'
import SignatureShopKeeper from '@domain/user/shopkeeper/signature/signature-shop-keeper.entity'
import { randomUUID } from 'crypto'
import { prisma } from '@infra/database/prisma/constants'
export default class ShopKeeperRepository implements IShopKeeperRepository {
  count(): Promise<number> {
    return prisma.user.count()
  }
  async findByEmail(
    email: string,
  ): Promise<ContractShopKeeper | SignatureShopKeeper | undefined> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        contract: true,
        signature: true,
      },
    })

    if (result?.contract) {
      return ShopKeeperFactory.withContract({
        name: result.name,
        cpf: result.cpf,
        email: result.email,
        rg: result.rg,
        password: result.password,
        contract: {
          startDate: result.contract?.startDate,
          endDate: result.contract?.endDate,
          value: result.contract.value,
        },
      })
    }

    if (result?.signature) {
      return ShopKeeperFactory.withSignature({
        name: result.name,
        cpf: result.cpf,
        email: result.email,
        rg: result.rg,
        password: result.password,
        signature: {
          startDate: result.signature?.startDate,
          plan: result.signature.plan as SignaturePlanEnum,
        },
      })
    }
  }
  async emailAlreadyExists(email: string): Promise<boolean> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    return Boolean(result)
  }
  async cpfAlreadyExists(cpf: string): Promise<boolean> {
    const result = await prisma.user.findFirst({
      where: {
        cpf,
      },
    })
    return Boolean(result)
  }
  async create(
    entity: ContractShopKeeper | SignatureShopKeeper,
  ): Promise<void> {
    if (entity instanceof ContractShopKeeper) {
      await prisma.user.create({
        data: {
          id: randomUUID(),
          name: entity.name,
          cpf: entity.cpf,
          email: entity.email,
          rg: entity.rg,
          password: entity.password,
          contract: {
            create: {
              startDate: entity.contract?.startDate,
              endDate: entity.contract?.endDate,
              value: entity.contract.value,
            },
          },
        },
      })
    }
    if (entity instanceof SignatureShopKeeper) {
      await prisma.user.create({
        data: {
          id: randomUUID(),
          name: entity.name,
          cpf: entity.cpf,
          email: entity.email,
          rg: entity.rg,
          password: entity.password,
          signature: {
            create: {
              startDate: entity.signature?.startDate,
              endDate: entity.signature.endDate,
              plan: entity.signature.plan as SignaturePlanEnum,
              value: entity.signature.value,
            },
          },
        },
      })
    }
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
  async findOne(
    id: string,
  ): Promise<ContractShopKeeper | SignatureShopKeeper | undefined> {
    const result = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        contract: true,
        signature: true,
      },
    })

    if (result?.contract) {
      return ShopKeeperFactory.withContract({
        name: result.name,
        cpf: result.cpf,
        email: result.email,
        rg: result.rg,
        password: result.password,
        contract: {
          startDate: result.contract?.startDate,
          endDate: result.contract?.endDate,
          value: result.contract.value,
        },
      })
    }

    if (result?.signature) {
      return ShopKeeperFactory.withSignature({
        name: result.name,
        cpf: result.cpf,
        email: result.email,
        rg: result.rg,
        password: result.password,
        signature: {
          startDate: result.signature?.startDate,
          plan: result.signature.plan as SignaturePlanEnum,
        },
      })
    }
  }
  async findAll(
    options: IShopKeeperListInputProps,
  ): Promise<
    IResourceListOutputProps<ContractShopKeeper | SignatureShopKeeper>
  > {
    const results = await prisma.user.findMany({
      where: {
        name: options.name,
      },
      include: {
        contract: true,
        signature: true,
      },
    })

    const mappedResult = results.map((result) => {
      if (result?.contract) {
        return ShopKeeperFactory.withContract({
          name: result.name,
          cpf: result.cpf,
          email: result.email,
          rg: result.rg,
          password: result.password,
          contract: {
            startDate: result.contract?.startDate,
            endDate: result.contract?.endDate,
            value: result.contract.value,
          },
        })
      }

      if (result?.signature) {
        return ShopKeeperFactory.withSignature({
          name: result.name,
          cpf: result.cpf,
          email: result.email,
          rg: result.rg,
          password: result.password,
          signature: {
            startDate: result.signature?.startDate,
            plan: result.signature.plan as SignaturePlanEnum,
          },
        })
      }
    })

    return {
      meta: {
        currentPage: 1,
        registersInPage: 1,
        totalPages: 1,
      },
      items: mappedResult,
    }
  }
  async update(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {},
    })
  }
}
