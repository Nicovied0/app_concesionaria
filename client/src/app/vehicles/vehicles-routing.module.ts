import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { DetailviewComponent } from './view/detailview/detailview.component';

const routes: Routes = [
  {
    path: "",
    component: HomeviewComponent
  },
  {
    path: 'detail/:id', 
    component: DetailviewComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
