export interface ApiResponse {
    message: string,
    data: any
}

export interface Contact {
    id: string
    firstName: string,
    lastName: string,
    phoneNumber: string,
    bookmark: boolean,
}