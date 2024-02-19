import { IStorage_User } from "../shared/interfaces"
import { User } from "./user"


export class StorageUser implements IStorage_User {
    store(data: User): void {
        throw new Error("Method not implemented.")
    }
    getList() {
        throw new Error("Method not implemented.")
    }
    findOneById(_id: number): User {
        throw new Error("Method not implemented.")
    }
    findAll(): User[] {
        throw new Error("Method not implemented.")
    }
    private users: User[] = []

    storeUser(user: User): void {
        user.set_id(this.users.length++)
        this.users.push(user)
    }

    getUsers(): User[] { return this.users }
}
