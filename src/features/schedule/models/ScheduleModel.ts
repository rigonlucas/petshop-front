import { PetModel } from 'src/features/pet/models/PetModel'
import { ClientModel } from 'src/features/client/models/ClientModel'
import UserModel from 'src/features/user/models/UserModel'
import { ScheduleHasProductModel } from 'src/features/schedule/models/ScheduleHasProductModel'

export enum ScheduleTypes {
    VETERINARIAN = 1,
    PET_CUT = 2,
    PET_SHOWER = 3,
    PET_CUT_SHOWER = 4
}

export const ScheduleTypesLabels = {
    [ScheduleTypes.VETERINARIAN]: 'Veterinario',
    [ScheduleTypes.PET_CUT]: 'Tosa',
    [ScheduleTypes.PET_SHOWER]: 'Banho',
    [ScheduleTypes.PET_CUT_SHOWER]: 'Banho e tosa',
} as {
    [key: number]: string
}

export enum ScheduleStatuses {
    SCHEDULED = 1,
    AWAITING = 2,
    EXECUTING = 3,
    ANIMAL_DONE = 4,
    FINISHED = 5,
    CANCELED = 6,
}

export const ScheduleStatusesLabels = {
    [ScheduleStatuses.SCHEDULED]: 'Agendado',
    [ScheduleStatuses.AWAITING]: 'Aguardando',
    [ScheduleStatuses.EXECUTING]: 'Em andamento',
    [ScheduleStatuses.ANIMAL_DONE]: 'Animal pronto',
    [ScheduleStatuses.FINISHED]: 'Finalizado',
    [ScheduleStatuses.CANCELED]: 'Cancelado',
} as {
    [key: number]: string
}

export const ScheduleStatusesColors = {
    [ScheduleStatuses.SCHEDULED]: 'Agendado',
    [ScheduleStatuses.AWAITING]: 'Aguardando',
    [ScheduleStatuses.EXECUTING]: 'Em andamento',
    [ScheduleStatuses.ANIMAL_DONE]: 'Animal pronto',
    [ScheduleStatuses.FINISHED]: 'Finalizado',
    [ScheduleStatuses.CANCELED]: 'Cancelado',
} as {
    [key: number]: string
}

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
