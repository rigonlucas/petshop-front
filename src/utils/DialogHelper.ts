import { Dialog } from 'quasar'

export async function confirm(title: string, message: string, color: string, ok: string) {
    return new Promise((resolve) => {
        Dialog.create({ title, message, cancel: true, ok: ok, color: color })
            .onOk(() => {
                resolve(true)
            })
            .onCancel(() => {
                resolve(false)
            })
            .onDismiss(() => {
                resolve(false)
            })
    })
}

export default {
    confirm,
}
