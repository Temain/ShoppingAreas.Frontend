import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/areas', pathMatch: 'full' },
  { path: 'areas', loadChildren: './modules/area/area.module#AreaModule' },
  { path: 'equipments', loadChildren: './modules/equipment/equipment.module#EquipmentModule' },
  { path: 'products', loadChildren: './modules/product/product.module#ProductModule' },
  { path: '', loadChildren: './modules/account/account.module#AccountModule' },

  // otherwise redirect
  { path: '**', redirectTo: '/areas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
