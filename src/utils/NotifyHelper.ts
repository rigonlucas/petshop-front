import { Notify } from 'quasar'

export enum Types {
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    WARNING = 'warning',
    INFO = 'info',
    ONGOING = 'ongoing',
}

export function notifyPositive(message: string, caption?: string): void {
    showNotify(message, caption, Types.POSITIVE, 'check')
}

export function notifyNegative(message: string, caption?: string): void {
    showNotify(message, caption, Types.NEGATIVE, 'error')
}

function showNotify(message: string, caption?: string, type?: Types, icon?: string): void {
    Notify.create({
        message,
        caption,
        type,
        icon,
        position: 'bottom-right',
        html: true,
        progress: true,
        closeBtn: true,
    })
}
