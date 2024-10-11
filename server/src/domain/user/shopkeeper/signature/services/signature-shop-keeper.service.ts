import { SignaturePlanEnum } from '../signature'
import { monthInserter } from '@application/utils/month-inserter'
import SignatureShopKeeper from '../signature-shop-keeper.entity'
export class SignatureShopKeeperService {
  public static signaturePeriod(shopKeeper: SignatureShopKeeper) {
    if (!shopKeeper.signature) return null

    const { plan, startDate } = shopKeeper.signature

    const signaturePeriodLiterals = {
      [SignaturePlanEnum.STARTER]: () => ({
        date: monthInserter(startDate, 1),
        value: 50,
      }),
      [SignaturePlanEnum.BASIC]: () => ({
        date: monthInserter(startDate, 6),
        value: 80,
      }),
      [SignaturePlanEnum.PREMIUM]: () => ({
        date: monthInserter(startDate, 12),
        value: 100,
      }),
    }
    const { date, value } = signaturePeriodLiterals[plan]()

    shopKeeper.signature.insertEndDate(date)
    shopKeeper.signature.insertValue(value)
  }
}
