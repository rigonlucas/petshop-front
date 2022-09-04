export interface MetaResponse {
    next_cursor: string|null
    prev_cursor: string|null
    path: string
    per_page: number
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
