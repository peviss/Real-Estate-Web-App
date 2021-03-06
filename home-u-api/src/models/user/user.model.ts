import { Document } from 'mongoose'

export default interface IUser extends Document {
    username: string
    password: string
    email: string
    phone: string

    name: {
        first: string
        last: string
    }
    image: {
        thumbnail: string
        mid: string
        full: string
    }
    role: string
    createdAt: string
    modifiedAt: string
    authenticate: (candidatePassword: string) => Promise<boolean>
}


