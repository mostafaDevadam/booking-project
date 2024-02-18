import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ALERT_PROPS, FEEDBACK_TYPE } from 'src/app/common/types';
import { FeedbackService } from 'src/app/services/feedback.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  public user: any
  public feedbacksList: FEEDBACK_TYPE[]

  public edit_feedback: any

  constructor(private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private feedbackService: FeedbackService,


  ) { }

  async ngOnInit() {
    console.log("---FeedbackPage---")
    await this.init()
  }

  async init() {
    this.activatedRoute.data.subscribe(({ data }: any) => {
      console.log("feedback resolve in Feedback-Page: ", data.user, data)
      this.user = data.user
    })

    if (this.user.role == 'guest') {
      console.log("user-role as guest in Feedback-Page: ", this.user.role, this.user._id)
      // fetchAllFeedbacksByGuestId
      await this.feedbackService.fetchAllByGuestId(this.user._id)
        .then(th => th.subscribe((sub: FEEDBACK_TYPE[]) => {
          // console.log("feedbackService in Feedback-Page: ", sub)
          this.feedbacksList = sub
          console.log("feedbackService by guest in Feedback-Page: ", sub, this.feedbacksList)

        }))

    } else if (this.user.role == 'hotel') {
      console.log("user-role as hotel in Feedback-Page: ", this.user.role)
      // fetchAllFeedbacksByHotelId
      await this.feedbackService.fetchAllByHotelId(this.user._id)
        .then(th => th.subscribe((sub: FEEDBACK_TYPE[]) => {
          // console.log("feedbackService in Feedback-Page: ", sub)
          this.feedbacksList = sub
          console.log("feedbackService by hotel in Feedback-Page: ", sub, this.feedbacksList)

        }))
    }
  }

  openModal() {

  }

  async updateFeedback(item: FEEDBACK_TYPE) {
    if (item) {
      console.log("updateFeedback: ", item)
      await this.feedbackService.patchUpdateFeedBackById(item._id, item)
    }


  }

  async removeFeedback(val: boolean, item: FEEDBACK_TYPE) {
    if (val) {
      console.log("removeFeedback: ", val, item)
      await this.feedbackService.removeOneFeedById(item._id)

    }

  }

  async openAlert(state: string, item: FEEDBACK_TYPE) { // state: 'edit' | 'remove'

    if (state === 'edit') {
      await this.presentAlert(state, {
        header: 'Feedback',
        subHeader: 'Edit My Feedback',
        message: 'Edit My Feedback for the Hotel'
      }, item)
    } else {
      await this.presentAlert(state, {
        header: 'Feedback',
        subHeader: 'Remove My Feedback',
        message: 'Remove My Feedback for the Hotel'
      }, item)
    }

  }

  async presentModal() {

  }

  async presentAlert(state: string, props: ALERT_PROPS, item: FEEDBACK_TYPE) {

    const alert = await this.alertCtrl.create({
      ...props,
      buttons: [
        {
          text: state === 'edit' ? 'close' : 'No', // if state is edit then display 'close' else display 'No'

        },
        {
          text: state === 'edit' ? 'Save' : 'Yes', // if state is edit then display 'Save' else display 'Yes'
          handler: (value) => {

            // console.log("save btn note:", value[0], this.note)

            // if state is edit then call updateFeedback else call remove()

            if (state === 'edit') {
              this.edit_feedback = value[0]
              console.log("save btn :", value[0], item, this.edit_feedback)
              item.content = value[0]
              this.updateFeedback(item)
            } else if (state === 'remove') {
              console.log("remove btn :", value)
              this.removeFeedback(true, item)
            }


          },
        }

      ],
      // if state is edit then display inputs
      inputs: this.displayAlertInputs(state, item),


    })

    await alert.present()

  }

  displayAlertInputs = (state: string, item: FEEDBACK_TYPE): any | false => {

    if (state === 'edit') {
      const inputs = [
        {
          label: 'Note',
          value: item.content || this.edit_feedback,
          attributes: {

          },
          type: 'textarea',
          placeholder: 'Write Your Note here...',
          handler: (input: any) => {
            console.log("alert input textarea: ", input)
            //this.note = input
          },


        }
      ]

      return inputs
    }

    return []
  }



}
