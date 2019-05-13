import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './pages/equipment.component';
import { EquipmentRouter } from './equipment-routing.module'
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthGuard } from 'src/app/auth.guard';

import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentEditComponent } from './components/equipment-edit/equipment-edit.component';
import { EquipmentCreateComponent } from './components/equipment-create/equipment-create.component';

@NgModule({
  declarations: [EquipmentComponent, EquipmentListComponent, EquipmentEditComponent, EquipmentCreateComponent],
  imports: [
    CommonModule,
    EquipmentRouter,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AuthGuard]
})
export class EquipmentModule { }
