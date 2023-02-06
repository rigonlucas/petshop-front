export enum ProductTypes {
    SERVICE = 1,
    PRODUCT = 2,
}
export const ProductTypesLabels = {
    [ProductTypes.SERVICE]: 'Serviço',
    [ProductTypes.PRODUCT]: 'Produto',
} as {
    [key: number]: string
}

export interface ProductModel {
    id: number,
    account_id: number,
    name: string,
    description: string|null,
    validate: string,
    type: ProductTypes,
    cost: number,
    price: number,
    created_at?: string,
    updated_at?: string,
}
