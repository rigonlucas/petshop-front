import { VaccineModel } from 'src/features/vaccine/models/VaccineModel'

export interface ScheduleHasVaccineModel {
    id: number,
    applied: boolean,
    vaccine?: VaccineModel,
}
