import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/areas', pathMatch: 'full' },
  { path: 'areas', loadChildren: './modules/area/area.module#AreaModule' },
  { path: 'equipments', loadChildren: './modules/equipment/equipment.module#EquipmentModule' },
  { path: 'account', loadChildren: './modules/account/account.module#AccountModule' },

  // otherwise redirect
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
