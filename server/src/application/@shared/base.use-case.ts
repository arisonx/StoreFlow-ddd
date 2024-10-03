import { Notification } from "domain/notification"

export default abstract class CommonUseCase {
  private _notification = new Notification()

  protected get notification() {
    return this._notification
  }
}
