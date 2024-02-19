import { eUSER_ROLE } from "../shared/enums"

export class User {

    private _id: number
    private name: string
    private email: string
    private password: string
    private role: eUSER_ROLE

    constructor(name: string, email: string, password: string, role: eUSER_ROLE) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
    }

    // it reads arrow-function as anonymous-function
    /*
    Arrow functions are anonymous functions i.e.
    functions without a name but they are often assigned to any variable.
    They are also called Lambda Functions.
    Arrow functions are a type of anonymous function
    */
    // public get_ = (): string =>  this.name

    set_id(_id: number): void {
        this._id = _id
    }

    get_id(): number {
        return this._id
    }

    public get_name(): string { return this.name }
    public get_email(): string { return this.email }
    public get_password(): string { return this.password }
    public get_role(): eUSER_ROLE { return this.role }
}
