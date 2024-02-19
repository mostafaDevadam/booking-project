import { User } from "../users/user";

export class FeedBack {

    private _id: number
    private hotel: User
    private guest: User
    private content: string

    constructor(hotel: User, guest: User, content: string) {
        this.hotel = hotel
        this.guest = guest
        this.content = content
    }

    set id(_id: number) {
       this._id = _id
    }

    get id(): number {
        return this._id
    }

    

}
