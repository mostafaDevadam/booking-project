import { IStorage_Room } from "../shared/interfaces"
import { Room } from "./room"


export class StorageRoom implements IStorage_Room {
    private rooms: Room[] = []

    store(data: Room): void {
        data.set_id(this.rooms.length++)
        this.rooms.push(data)
    }
    getList(): Room[] {
        return this.rooms
    }
    findOneById(_id: number): Room {
        return this.rooms.filter((f) => f.get_id() === _id)[0]
    }
    findAll(): Room[] {
        return this.rooms
    }


    storeRooms(room: Room): void {
        room.set_id(this.rooms.length++)
        this.rooms.push(room)
    }

    getRooms(): Room[] {
        return this.rooms
    }
}
