
export interface VaccineModel {
    id: number
    name: string
    description?: string
    type: number
    number_first_shoot: number
    number_first_shoot_days: number
    days_to_booster_dose: number
    created_at: string
    updated_at?: string
}
