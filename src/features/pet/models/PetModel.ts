import { ClientModel } from 'src/features/client/models/ClientModel'
import { BreedModel } from 'src/features/pet/models/BreedModel'

export interface PetModel {
    id: number,
    name: string,
    client: ClientModel,
    breed: BreedModel,
    created_at: string,
}
