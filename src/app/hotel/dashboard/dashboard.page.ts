import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  roomsDataForChart = {
    type: 'column',
    name: 'Rooms',
    data: [
      {
        //x: 0,
        y: 9,
        name: "Available Rooms",
        color: "#00FF00",

      }, {
        //x: 0,
        y: 6,
        name: "Booked Rooms",
        color: "#FF00FF"
      }
    ],
  }

  roomsTypeDataForChart = {
    type: 'pie',
    name: 'RoomsTypes',
    data: [
      {
        //x: 0,
        y: 9,
        name: "Single Rooms",
        color: "#00FF00",

      }, {
        //x: 0,
        y: 6,
        name: "Double Rooms",
        color: "#FF00FF"
      }
    ],
  }

  guestsDataForChart = {
    type: 'column',
    name: 'Guests',
    data: [
      {
        //x: 0,
        y: 500,
        name: "Guests",
        color: "#00FF00",

      },

      {
        //x: 0,
        y: 200,
        name: "Active Guests",
        color: "#FF00FF"
      },
      {
        //x: 0,
        y: 300,
        name: "InActive",
        color: "#F26D5B",

      },
    ],
  }

  //  cleaned-,-not-cleaned-rooms,
  cleanRoomsDataForChart = {
    type: 'column',
    name: 'CleanRooms',
    data: [
      {
        //x: 0,
        y: 9,
        name: "Cleaned Rooms ",
        color: "#00FF00",

      }, {
        //x: 0,
        y: 3,
        name: "Not-Cleaned Rooms",
        color: "#FF00FF"
      }
    ],
  }

  // incomes
  incomesDataForChart = {
    type: 'column',
    name: 'InComes',
    data: [
      {
        //x: 0,
        y: 10000,
        name: "Low incomes",
        color: "#00FF00",

      }, {
        //x: 0,
        y: 17000,
        name: "Good incomes",
        color: "#FF00FF"
      }
    ],
  }

  constructor(
    private hotelService: HotelService
  ) { }

  ngOnInit() {
    console.log("---------")

  }

}
