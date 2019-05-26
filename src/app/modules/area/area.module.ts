import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './pages/area.component';
import { AreaRouter } from './area-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AreaServiceModule } from 'src/app/shared/modules/area-service.module';
import { AuthGuard } from 'src/app/auth.guard';

import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AreaCreateComponent } from './components/area-create/area-create.component';
import { AreaEquipmentComponent } from './components/area-equipment/area-equipment.component';
import { AreaProductComponent } from './components/area-product/area-product.component';
import { EquipmentServiceModule } from 'src/app/shared/modules/equipment-service.module';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AreaComponent, 
    AreaListComponent, 
    AreaEditComponent, 
    AreaCreateComponent, 
    AreaEquipmentComponent, 
    AreaProductComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    AreaRouter,
    ReactiveFormsModule,
    SharedModule,
    AreaServiceModule,
    FormsModule,
    DragDropModule,
    EquipmentServiceModule
  ],
  providers: [AuthGuard]
})
export class AreaModule { }
