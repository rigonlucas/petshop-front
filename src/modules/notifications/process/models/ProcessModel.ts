export default interface ProcessModel {
    _id: number,
    name: string,
    uuid: string,
    file_type: string,
    has_error: boolean,
    file_group: Array<object>,
    temporary_url: Array<object>,
    created_at: string,
    finished_at: string,
}
