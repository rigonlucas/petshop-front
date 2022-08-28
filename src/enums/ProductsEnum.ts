export enum ProductsEnum {
    'Serviço' = 1,
    'Produto' = 2
}
export function findProductEnum (value: number): string {
    return ProductsEnum[value]
}
