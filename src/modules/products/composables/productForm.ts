import { ProductFormData } from 'src/modules/products/models/ProductFormData'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export function useValidations(formData: ProductFormData) {
    const requiredWithMessage = helpers.withMessage('Campo obrigatório', required)
    const formRules = {
        name: { requiredWithMessage },
        type: { requiredWithMessage },
        price: { requiredWithMessage },
    }
    return useVuelidate<ProductFormData>(formRules, formData)
}
