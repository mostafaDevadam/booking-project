import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


 var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  }
];

 const multi: any = [
  {
    "name": "Germany",
    "series": [
      {
         type: 'bar',
        "name": "2010",
        "value": 7300000
      },
      {
         type: 'bar',
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        type: 'bar',
        "name": "2010",
        "value": 7870000
      },
      {
        type: 'bar',
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
         type: 'bar',
        "name": "2010",
        "value": 5000002
      },
      {
         type: 'bar',
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() data: any
  @Input() categories: any[]

  /*data = [
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ]*/
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options

/*
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    //accessibility: '' ,

    title: {
      text: 'Booking-Chart',
    },
    xAxis: {
      categories: ['A', 'B', 'O']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      },

      labels: {
        formatter: (val: any) => {
          console.log("y:", val)
          return val.value
        }
      }
    },*/
   /* yAxis: {
      labels: {
        formatter: (val: any) => {
          console.log("y:", val)
          return val.value +'%'
        }
      }
    },*/
   /* xAxis: {
      labels: {
        formatter: (val: any) => {
          console.log("x:", val)
          return val.value
        }
      }
    },*/
    /*
    series: [
      this.roomsData,
      {
        type: 'column',
        name: 'Rooms',
        data: [
          /*{
            name: 'one',
            value: 2,
          },
          {
            name: 'seven',
            value: 7,
          },{
            name: 'five',
            value: 5,
          },*/
/*
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
    ], */
    /*[
      {
        type: 'bar',
        name: 'country',
        data: [1,0,5],
        //colorAxis: 0,
        //yAxis: 'y',
        //xAxis: 'x',
      },
      {
        type: 'bar',
        name: 'people',
        data: [5, 7, 3],

      }
    ]*/
  /*};*/

  constructor() {
  }

  onSelect(event: any) {
    console.log(event);
  }

  ngOnInit() {
    console.log("---ChartComponent----")
    this.init()
  }

  init() {

    this.chartOptions = {
      title: {
        text: this.data.name,
      },
      xAxis: {
        categories: this.categories
      },
      yAxis: {
        title: {
          text: this.data.name,
        },

        labels: {
          formatter: (val: any) => {
            console.log("y:", val)
            return val.value
          }
        }
      },

      series: [
        this.data,

      ]
    }

  }

}
