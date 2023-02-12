import { PetModel } from 'src/modules/pet/models/PetModel'

export interface ClientModel {
    id: number,
    account_id: number,
    name: string,
    email: string,
    phone: string,
    pets: PetModel[],
    schedules_count: number,
    created_at: string,
    updated_at: string,
}
