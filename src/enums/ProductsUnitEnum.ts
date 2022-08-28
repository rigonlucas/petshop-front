export enum ProductsUnitEnum{
    "un" = 1,
    "kg" = 2,
    "l" = 3,
    "gm" = 4,
    "ml" = 5
}

export function findProductUnitEnum (value: number): string {
    return ProductsUnitEnum[value]
}
