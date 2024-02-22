import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ALERT_PROPS, BOOKING_TYPE, NOTE_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { map, pipe } from 'rxjs';

enum eNOTES_ROLE_ENUM {
 // all = 'all',
  hotel = 'hotel',
  guest = 'guest'
}
@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {
  @Input() props: any
  isEdit: boolean = false
  isView: boolean = false
  data: BOOKING_TYPE | any

  isModalOpen = false;
  noteForm: FormGroup

  currentNote: NOTE_TYPE

  edit_note_content: string


  notes: NOTE_TYPE[] = []
  allNotes: NOTE_TYPE[] = []
  notesForGuest: NOTE_TYPE[]
  notesForHotel: NOTE_TYPE[]

  note_role_keys = Object.keys(eNOTES_ROLE_ENUM)

  public currentNoteRole: eNOTES_ROLE_ENUM = eNOTES_ROLE_ENUM.hotel




  constructor(private modalCtrl: ModalController,
    public bookingService: BookingService,
    private noteService: NoteService,
    private alertCtrl: AlertController,
    private userService: UserService,
  ) { }

  ngOnInit() {
    console.log("--- BookingModalComponent ----")
    this.isEdit = this.props.role == 'edit' ? true : false
    this.isView = this.props.role == 'view' ? true : false
    console.log("props: ", this.props, this.isEdit)
    this.data = this.props.booking
    this.init()
  }

  lbls: { [key in eNOTES_ROLE_ENUM]: eNOTES_ROLE_ENUM } = {
    //all: eNOTES_ROLE_ENUM.all,
    hotel: eNOTES_ROLE_ENUM.hotel,
    guest: eNOTES_ROLE_ENUM.guest,
  }

  getNoteRole = (t: eNOTES_ROLE_ENUM) => this.lbls[t]

  close = () => { this.modalCtrl.dismiss() }

  async init() {
    console.log("booking: ", this.bookingService.booking, this.data)

    await this.noteService.findAllByBookingId(this.props.booking._id || this.data._id)
      .then(th => th.pipe(map((data: NOTE_TYPE[]) => {
        console.log("pipe map notes:", data)

        //data = data.filter((fl, index,arr) => fl.isPublic === true)

        return data
      }))

        .subscribe((sub: NOTE_TYPE[]) => {
          // if current_user._id === note.author then display as hotel notes in booking
          // if booking.guest === note.author then display as guest notes in booking
          //if (this.userService.currentUser._id == "note.author") "this.notesForHotel=sub"
          //if (this.data._id === "note.author")  "this.notesForGuest=sub"

          this.notesForHotel = sub.filter((fl, index, arr) => fl.author == this.userService.currentUser._id)
          this.notesForGuest = sub.filter((fl, index, arr) => fl.author == this.data.guest && fl.isPublic === true)
          console.log("notes this.notesForHotel: ", this.notesForHotel)
          console.log("notes this.notesForGuest: ", this.notesForGuest)

          this.allNotes = sub

          this.notes = this.notesForHotel
          console.log("notes findAllByBookingId: ", sub)
        }))

    this.initNoteForm()
  }



  async initNoteForm() {
    if (this.currentNote) {
      console.log("currentNote: ", this.currentNote)
    }
    this.noteForm = new FormGroup({
      content: new FormControl<string>(''),
      isPublic: new FormControl<Boolean>(false)
    })
  }


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


  changeNoteRole() {
    console.log("change note role: ", this.currentNoteRole)
    /*if (this.currentNoteRole == 'all') {
      this.notes = this.allNotes
    } else*/
    if (this.currentNoteRole == 'hotel') {
      this.notes = this.notesForHotel
    } else if (this.currentNoteRole == 'guest') {
      this.notes = this.notesForGuest
    }

  }

}
