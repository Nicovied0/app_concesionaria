import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeviewComponent } from './view/homeview/homeview.component';

const routes: Routes = [
  {
    path: "",
    component: HomeviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
