import { SignaturePlanEnum } from '../signature'
import { monthInserter } from '@utils/month-inserter'
import SignatureShopKeeper from '../signature-shop-keeper.entity'
export class SignatureShopKeeperService {
  public static signaturePeriod(shopKeeper: SignatureShopKeeper) {
    if (!shopKeeper.signature) return null

    const { plan, startDate } = shopKeeper.signature

    const signaturePeriodLiterals = {
      [SignaturePlanEnum.STARTER]: monthInserter(startDate, 1),
      [SignaturePlanEnum.BASIC]: monthInserter(startDate, 6),
      [SignaturePlanEnum.PREMIUM]: monthInserter(startDate, 12),
    }
    const endDate = signaturePeriodLiterals[plan]

    shopKeeper.signature.insertEndDate(endDate)
  }
}
