import { Notify } from 'quasar'

export enum Types {
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    WARNING = 'warning',
    INFO = 'info',
    ONGOING = 'ongoing',
}

export function notifyPositive(message: string, caption?: string): void {
    showNotify(message, caption, Types.POSITIVE)
}

export function notifyNegative(message: string, caption?: string): void {
    showNotify(message, caption, Types.NEGATIVE)
}

function showNotify(message: string, caption?: string, type?: Types, icon? : string): void {
    Notify.create({
        message,
        caption,
        type,
        icon,
        position: 'top-right'
    })
}
