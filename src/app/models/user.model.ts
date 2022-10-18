export class UserData {
    data!: User[]
    total!: number
    page!: number
    limit!: number
}

export class User {
    id!: string
    title!: string
    firstName!: string
    lastName!: string
    picture!: string
}
