import { NotificationError } from 'domain/base/errors/notification-error'

interface INotificationProps<T> {
  context: string
  error: T
}

export class Notification<T extends Error> {
  private errors: INotificationProps<T>[] = []
  add(error: INotificationProps<T>) {
    this.errors.push(error)
  }

  issue() {
    if (this.errors.length > 0) {
      let message = this.errors
        .map((item) => `${item.context}: ${item.error.message}`)
        .join(', ')
      throw new NotificationError(message)
    }
  }

  get length() {
    return this.errors.length
  }
}
