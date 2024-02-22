import { Component, Input, OnInit, inject } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ROLE_FORM_ENUM } from '../../../../common/enums';
import { BookingService } from 'src/app/services/booking.service';
import { map } from 'rxjs';
import { ALERT_PROPS, BOOKING_TYPE, NOTE_TYPE } from 'src/app/common/types';
import { NoteService } from 'src/app/services/note.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-booking-modal',
  templateUrl: './my-booking-modal.component.html',
  styleUrls: ['./my-booking-modal.component.scss'],
})
export class MyBookingModalComponent implements OnInit {

  @Input() props: any

  isCreate: boolean = false
  isEdit: boolean = false
  isView: boolean = false

  public role_form = ROLE_FORM_ENUM

  bookingService = inject(BookingService)

  booking: BOOKING_TYPE

  notes: NOTE_TYPE[] = []

  public user: any

  edit_note_content: string

  isModalOpen = false;
  noteForm: FormGroup

  currentNote: NOTE_TYPE


  constructor(
    private modalCtrl: ModalController,
    private noteService: NoteService,
    private alertCtrl: AlertController,
    private userService: UserService,


  ) { }

  async ngOnInit() {
    console.log("---MyBookingModalComponent---")
    console.log("props: ", this.props)
    this.isCreate = this.props.role === 'create'
    this.isEdit = this.props.role === 'edit'
    this.isView = this.props.role === 'view'

    this.bookingService.myBooking.asObservable()
      .pipe(map((data: any) => {
        //this.booking = data
        return data
      }))
      .subscribe((sub) => {
        console.log("myBooking asObservable sub: ", sub)
        this.booking = sub
      })

    console.log("props role: ", this.isCreate, this.bookingService.booking, this.booking)

    await this.noteService.findAllByBookingId(this.props.booking._id || this.booking._id)
      .then(th => th.subscribe((sub) => {
        this.notes = sub
        console.log("notes findAllByBookingId: ", sub)
      }))
    //console.log("notes list signal: ", this.noteService.compute())

    this.init()

  }

  async init() {

    this.initNoteForm()

  }


  async initNoteForm() {
    if (this.currentNote) {
      console.log("currentNote: ", this.currentNote)
    }
    this.noteForm = new FormGroup({
      content: new FormControl<string>(''),
      isPublic: new FormControl<Boolean>(this.currentNote ? Boolean(this.currentNote.isPublic) : false)
    })
  }


  close = () => this.modalCtrl.dismiss()


  async editNote(item: NOTE_TYPE) {
    console.log("editNote: ", item)
    // update note
    await this.noteService.updateById(item._id, item)

  }

  async removeNote(val: boolean, item: NOTE_TYPE) {
    if (val) {
      console.log("removeNote: ", val, item)
      // remove note
      await this.noteService.removeById(item._id)
    }

  }



  async openAlert(state: string, item: NOTE_TYPE) {
    if (state === 'edit') {
      await this.presentAlert<NOTE_TYPE>(state, item, {
        header: 'Note',
        subHeader: 'Edit My Note',
        message: 'Edit My Note for My Booking'
      }, 'Edit your note here...',

      )
    } else if (state === 'remove') {
      await this.presentAlert<NOTE_TYPE>(state, item, {
        header: 'Remove',
        subHeader: 'Remove My Note',
        message: 'Remove My Note for My Booking'
      },

      )
    }
  }

  async presentAlert<T>(state: string, item: T, props: ALERT_PROPS, placeholder?: string, inputs?: any) {

    const alert = await this.alertCtrl.create({
      /*header: 'Feedback',
      subHeader: 'Write My Feedback',
      message: 'Create A New FeedBack for the Hotel',*/
      ...props,
      buttons: [
        {
          text: state === 'edit' ? 'close' : 'No',
        },
        {
          text: state === 'edit' ? 'Save' : 'Yes',

          handler: async (value) => {

            if (state === 'edit') {
              this.edit_note_content = value[0]
              const n: NOTE_TYPE = <NOTE_TYPE>item
              console.log("save btn note:", value[0], this.edit_note_content)
              n.content = value[0]
              await this.editNote(<NOTE_TYPE>item)
            } else if (state === 'remove') {
              await this.removeNote(true, <NOTE_TYPE>item)
            }



          },
        }

      ],
      inputs: this.displayAlertInputs(state, <NOTE_TYPE>item),


    })

    await alert.present()

  }



  displayAlertInputs = (state: string, item: NOTE_TYPE): any | false => {

    if (state === 'edit') {
      const inputs = [
        {
          label: 'Note',
          value: item.content || this.edit_note_content,
          attributes: {

          },
          type: 'textarea',
          placeholder: 'Write Your Note here...',
          handler: (input: any) => {
            console.log("alert input textarea: ", input)
            //this.note = input
          },


        },

      ]

      return inputs
    }

    return []
  }

  selectNote(item: NOTE_TYPE) {
    if (item) {
      this.currentNote = item
      console.log("currentNote: ", this.currentNote)
      this.noteForm.patchValue({ 'isPublic': item.isPublic })
      this.noteForm.patchValue({ 'content': item.content })

    }
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async submitNoteForm() {
    // const user = this.userService.currentUser


    if (this.noteForm.value && this.currentNote) {
      console.log("submitNoteForm: ", this.noteForm.value)
      const user = this.userService.currentUser


      const data: NOTE_TYPE = {
        _id: this.currentNote._id,
        author_role: this.currentNote.author_role,
        author: this.currentNote.author,
        content: this.noteForm.value.content,
        isPublic: this.noteForm.value.isPublic,
        booking: this.currentNote.booking,
      }

      console.log("update note obj:", data)
      //  await this.noteService.updateById(this.currentNote._id, data)
      await this.editNote(data)

      this.setOpen(false)

    }

  }

}
