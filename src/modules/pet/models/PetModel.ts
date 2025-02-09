import { ClientModel } from 'src/modules/client/models/ClientModel'
import { BreedModel } from 'src/modules/pet/models/BreedModel'

export interface PetModel {
    id: number,
    name: string,
    client: ClientModel,
    breed: BreedModel,
    created_at: string,
}
