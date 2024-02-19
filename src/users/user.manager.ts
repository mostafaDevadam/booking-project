import { eUSER_ROLE } from "../shared/enums"
import { IUser_Manager } from "../shared/interfaces"
import { User } from "./user"

export class UserManager implements IUser_Manager {
    create(data: User): false | User {
        return
    }
    update(_id: number, data: User): false | User {
        throw new Error("Method not implemented.")
    }
    remove(_id: number) {
        throw new Error("Method not implemented.")
    }


    createUser(name: string, email: string, password: string, role: eUSER_ROLE): User {
        return new User(name, email, password, role)
    }
}
