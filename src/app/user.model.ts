export interface UserData {
    data: User[]
    total: number
    page: number
    limit: number
}

export interface User {
    id: string
    title: string
    firstName: string
    lastName: string
    picture: string
}
