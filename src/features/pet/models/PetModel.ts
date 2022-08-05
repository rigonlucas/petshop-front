import { ClientModel } from 'src/features/client/models/ClientModel'

export interface PetModel {
    id: number,
    name: string,
    client: ClientModel
    created_at: string,
}
