import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMailPage } from './view-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMailPageRoutingModule {}
