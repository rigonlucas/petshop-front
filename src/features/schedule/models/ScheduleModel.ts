import { PetModel } from 'src/features/pet/models/PetModel'
import { ClientModel } from 'src/features/client/models/ClientModel'
import UserModel from 'src/features/user/models/UserModel'
import { ScheduleHasProductModel } from 'src/features/schedule/models/ScheduleHasProductModel'

export interface ScheduleModel {
    id: number
    account_id: number
    client_id: number
    pet_id: number
    user_id: number
    type: number
    status: number
    start_at: string
    duration: number
    finish_at: string
    description?: string
    created_at: string
    updated_at?: string
    pet: PetModel
    client: ClientModel
    user: UserModel
    hasProducts: ScheduleHasProductModel[]
}
