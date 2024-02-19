import { Booking } from "./booking/booking";
import { BookingManager } from "./booking/booking.manager";
import { StorageBooking } from "./booking/booking.storage";
import { Room } from "./room/room";
import { FilterRoom } from "./room/room.filter";
import { RoomManager } from "./room/room.manager";
import { ColorSpecification, RoomSizeSpecification } from "./room/room.specifications";
import { StorageRoom } from "./room/room.storage";
import { eCOLOR, eROOM_SIZE, eUSER_ROLE } from "./shared/enums"
import { User } from "./users/user";
import { FilterUser } from "./users/user.filter";
import { UserManager } from "./users/user.manager";
import { UserRoleSpecification } from "./users/user.specifications";
import { StorageUser } from "./users/user.storage";


// feedback: hotel_id, guest_id, content
// usage user
const uManager = new UserManager()
const storageUser = new StorageUser()

const guest1: User = uManager.createUser("guest1", "guest1@test.de", "123", eUSER_ROLE.GUEST)
const guest2: User = uManager.createUser("guest2", "guest2@test.de", "789", eUSER_ROLE.GUEST)

const hotel1: User = uManager.createUser("hotel1", "hotel1@test.de", "456", eUSER_ROLE.HOTEL)

storageUser.storeUser(guest1)
storageUser.storeUser(guest2)

storageUser.storeUser(hotel1)

const allUsers: User[] = storageUser.getUsers()

console.log("allUsers: ", allUsers)

// usage room
const room_manager: RoomManager = new RoomManager()
const storage_room: StorageRoom = new StorageRoom()

const room1: Room | boolean = room_manager.createRoom(hotel1, "55", "01", eCOLOR.BLUE, eROOM_SIZE.SINGLE)
const room2: Room | boolean = room_manager.createRoom(hotel1, "65", "02", eCOLOR.GREEN, eROOM_SIZE.SINGLE)
const room3: Room | boolean = room_manager.createRoom(hotel1, "75", "03", eCOLOR.GREEN, eROOM_SIZE.DOUBLE)
const room4: Room | boolean = room_manager.createRoom(hotel1, "80", "04", eCOLOR.GREEN, eROOM_SIZE.DOUBLE)


if (room1) storage_room.storeRooms(room1)

if (room2) storage_room.storeRooms(room2)

if (room3) storage_room.storeRooms(room3)

if (room4) storage_room.storeRooms(room4)


const allRooms: Room[] = storage_room.getRooms()
console.log("allRooms:", allRooms)

const get_room = storage_room.findOneById(6)
console.log("findOneRoomById:", get_room)



// usage Booking
const booking_manager: BookingManager = new BookingManager()
const storage_booking: StorageBooking = new StorageBooking()

if (room1) {
    const booking1: Booking | boolean = booking_manager.createBooking(
        2,
        hotel1,
        guest1,
        room1,
    )
    if (booking1) storage_booking.storeBooking(booking1)
}

if (room2) {
    const booking2: Booking | boolean = booking_manager.createBooking(
        4,
        hotel1,
        guest2,
        room2,
    )
    if (booking2) storage_booking.storeBooking(booking2)
}
const allBookings: Booking[] = storage_booking.getBookings()
console.log("allBookings:", allBookings)

// usage filter

// room filter
const colorSpec: ColorSpecification = new ColorSpecification(eCOLOR.BLUE)
const roomSizeSpec: RoomSizeSpecification = new RoomSizeSpecification(eROOM_SIZE.DOUBLE)
const filterRoom = new FilterRoom()
const filterRoomsByColor = filterRoom.filter(allRooms, colorSpec)
const filterRoomsBySize = filterRoom.filter(allRooms, roomSizeSpec)

console.log("filterRoomsByColor: ", filterRoomsByColor)
console.log("filterRoomsBySize: ", filterRoomsBySize)

// user filter
const userRoleSpec: UserRoleSpecification = new UserRoleSpecification(eUSER_ROLE.HOTEL)
const filterUser = new FilterUser()
const filterUserByRoleSpec = filterUser.filter(allUsers, userRoleSpec)

console.log("filterUserByRoleSpec: ", filterUserByRoleSpec)


