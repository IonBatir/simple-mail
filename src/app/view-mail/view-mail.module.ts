import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMailPageRoutingModule } from './view-mail-routing.module';

import { ViewMailPage } from './view-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMailPageRoutingModule
  ],
  declarations: [ViewMailPage]
})
export class ViewMailPageModule {}
