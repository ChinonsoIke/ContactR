export interface ApiResponse {
    message: string,
    data: any
}

export interface Contact {
    id: string
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    bookmark: boolean,
}

export interface CreateContactDTO {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export interface UpdateContactDTO {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phoneNumber: string | null,
    bookmark: boolean | null
}