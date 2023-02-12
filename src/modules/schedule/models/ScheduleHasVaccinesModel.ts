import { VaccineModel } from 'src/modules/vaccine/models/VaccineModel'

export interface ScheduleHasVaccineModel {
    id: number,
    applied: boolean,
    vaccine?: VaccineModel,
}
