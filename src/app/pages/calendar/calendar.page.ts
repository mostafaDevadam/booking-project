import { Component, OnInit } from '@angular/core';
import { RangeCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  public date: any
  public format = 'DD-MM-YYYY'

  constructor() { }

  ngOnInit() {
    console.log("---Calendar---")
  }

  confirm = (event: any) => {
    console.log("confirm date: ", event)
  }

  onChange = (event: any) => {
    console.log("change: ", event)

  }
  monthChange = (event: any) => {
    console.log("monthChange: ", event)
  }

  onSelectDate = (val: any) => {
    console.log("onSelectDate: ", val, val.dayValues)
    this.date = val.value

  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  onIonChange(ev: Event) {
    console.log('ionChange emitted value:', (ev as RangeCustomEvent).detail.value);
  }

  onIonKnobMoveStart(ev: Event) {
    console.log('ionKnobMoveStart:', (ev as RangeCustomEvent).detail.value);
  }

  onIonKnobMoveEnd(ev: Event) {
    console.log('ionKnobMoveEnd:', (ev as RangeCustomEvent).detail.value);
  }


}
