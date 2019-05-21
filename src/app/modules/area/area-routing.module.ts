import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

import { AreaComponent } from './pages/area.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AreaCreateComponent } from './components/area-create/area-create.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaEquipmentComponent } from './components/area-equipment/area-equipment.component';
import { AreaProductComponent } from './components/area-product/area-product.component';

const routes: Routes = [
  { 
    path: '', 
    component: AreaComponent,
    children: [
      { path: '', component: AreaListComponent },
      { path: 'create', component: AreaCreateComponent },
      { path: ':id', component: AreaEditComponent },
      { path: ':id/equipment', component: AreaEquipmentComponent },
      { path: ':id/product', component: AreaProductComponent },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AreaRouter {
}
