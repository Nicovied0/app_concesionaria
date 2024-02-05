import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { DetailviewComponent } from './view/detailview/detailview.component';
import { ContactviewComponent } from './view/contactview/contactview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeviewComponent,
  },
  {
    path: ':brand',
    component: HomeviewComponent,
  },
  {
    path: 'detail/:id',
    component: DetailviewComponent,
  },

  {
    path: 'detail/:id/:email',
    component: ContactviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
