export enum ProductTypes {
    'Serviço' = 1,
    'Produto' = 2
}

export enum ProductUnitEnum{
    'un' = 1,
    'kg' = 2,
    'l' = 3,
    'gm' = 4,
    'ml' = 5
}

export interface ProductModel {
    id: number,
    account_id: number,
    name: string,
    description: string,
    validate: string,
    type: number,
    measurement_unit: number,
    cost: number,
    price: number,
    created_at: string,
    updated_at: string,
}
