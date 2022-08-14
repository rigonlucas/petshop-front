import { isValid, parse } from 'date-fns'
import { helpers } from '@vuelidate/validators'

export function dateFormat(format: string) {
    return helpers.withMessage('Formato da data inválido', function (value: string) {
        return isValid(parse(value, format, new Date()))
    })
}
