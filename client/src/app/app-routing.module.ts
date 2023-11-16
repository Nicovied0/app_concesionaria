import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "/",
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: "/contact",
    loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: "/dashboard",
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
