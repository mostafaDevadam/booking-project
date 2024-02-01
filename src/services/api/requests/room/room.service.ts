import { getOneRoomById } from './getOneRoomById';
import { getAllRoomsByHotelId } from './getAllRoomsByHotelId';
import { getAllRooms } from './getAllRooms';
import { getAllBookedRooms } from './getAllBookedRooms';
import { getAllCleanedRooms } from './getAllCleanedRooms';
import { getAllNotCleanedRooms } from './getAllNotCleanedRooms';
import { getAllSingleRooms } from './getAllSingleRooms';
import { getAllDoubleRooms } from './getAllDoubleRooms';
import { postCreateRoomByHotelId } from './postCreateRoomByHotelId';
import { patchRoomById } from './patchRoomById';
import { deleteRoomById } from './deleteRoomById';
import { getAllAvailableRooms } from './getAllAvailableRooms';


export const RoomService = {
    postCreateRoomByHotelId,
    patchRoomById,
    deleteRoomById,
    getOneRoomById,
    getAllRooms,
    getAllRoomsByHotelId,
    getAllAvailableRooms,
    getAllBookedRooms,
    getAllCleanedRooms,
    getAllNotCleanedRooms,
    getAllSingleRooms,
    getAllDoubleRooms,

}
