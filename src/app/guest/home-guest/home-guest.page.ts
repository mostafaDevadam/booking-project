import { Component, OnInit, WritableSignal, computed, signal } from '@angular/core';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.page.html',
  styleUrls: ['./home-guest.page.scss'],
})
export class HomeGuestPage implements OnInit {
  i = 0

  sortiment = null

  public warenkorb = signal([''])

  public arraySignal: WritableSignal<string[]> = signal([])

  public computedDisplay = computed(() => {
    return this.arraySignal().join(', ')
  })

  count = 0

  constructor() { }

  ngOnInit() {
    console.log("---HomeGuestPage---")

    this.warenkorb.set(['1'])

  }

  init() {

  }

  addItem(newItem: string) {
    this.warenkorb.update((value) => [...value, newItem])
    //this.warenkorb.
    this.i++
  }

  appendValue() {
    this.arraySignal.update((arr: string[]) => {
      arr.push(`Update ${this.count++}`)
      return arr
    })
  }

  appendAndShow() {
    this.arraySignal.update((arr: string[]) => {
      arr.push(`Update ${this.count++}`)
      return arr.slice(0)
    })
  }

  showWithSet() {
    this.arraySignal.set(this.arraySignal().slice(0))
  }

  showWithUpdate() {
    this.arraySignal.update((arr: string[]) => {
      return arr.slice(0)
    })
  }

}
