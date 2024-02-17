import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FeedbackPageRoutingModule
  ],
  declarations: [FeedbackPage, FeedbackModalComponent, FeedbackFormComponent]
})
export class FeedbackPageModule {}
