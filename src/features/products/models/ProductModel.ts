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

export enum ProductMeasurementUnit {
    UN = 1,
    KG = 2,
    L = 3,
    GM = 4,
    ML = 5
}
export const ProductMeasurementUnitLabels = {
    [ProductMeasurementUnit.UN]: 'un',
    [ProductMeasurementUnit.KG]: 'kg',
    [ProductMeasurementUnit.L]: 'l',
    [ProductMeasurementUnit.GM]: 'gm',
    [ProductMeasurementUnit.ML]: 'ml',
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
    measurement_unit: number,
    cost: number,
    price: number,
    created_at: string,
    updated_at: string,
}
