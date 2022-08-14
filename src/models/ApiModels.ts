interface MetaResponse {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface PaginatedServerResponse<DataT> {
    data: DataT[]
    meta: MetaResponse
}

export interface ApiErrors {
    message: string,
    errors: {
        [key: string]: string[]
    }
}
