import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

import { EquipmentComponent } from './pages/equipment.component';
import { EquipmentEditComponent } from './components/equipment-edit/equipment-edit.component';
import { EquipmentCreateComponent } from './components/equipment-create/equipment-create.component';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: EquipmentComponent,
    children: [
      { path: '', component: EquipmentListComponent },
      { path: 'create', component: EquipmentCreateComponent },
      { path: ':id', component: EquipmentEditComponent }
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

export class EquipmentRouter {
}
