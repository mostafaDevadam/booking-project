import { Specification_G } from "../shared/abstracts"
import { eUSER_ROLE } from "../shared/enums"
import { User } from "./user"


export class UserRoleSpecification extends Specification_G<User> {
    private user_role: eUSER_ROLE

    constructor(user_role: eUSER_ROLE) {
        super()
        this.user_role = user_role
    }

    public isValid(user: User): boolean {
        return user.get_role() === this.user_role
    }
}
