import { Specification_G } from "../shared/abstracts";
import { IFilter_User } from "../shared/interfaces";
import { User } from "./user";



export class FilterUser implements IFilter_User {
    filter(users: User[], specification: Specification_G<User>): User[] {
        return users.filter(user => specification.isValid(user))
    }
}
