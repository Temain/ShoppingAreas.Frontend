import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './pages/area.component';
import { AreaRouter } from './area-routing.module'
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AreaServiceModule } from 'src/app/shared/modules/area-service.module';
import { AuthGuard } from 'src/app/auth.guard';

import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AreaCreateComponent } from './components/area-create/area-create.component';

@NgModule({
  declarations: [AreaComponent, AreaListComponent, AreaEditComponent, AreaCreateComponent],
  imports: [
    CommonModule,
    AreaRouter,
    ReactiveFormsModule,
    SharedModule,
    AreaServiceModule
  ],
  providers: [AuthGuard]
})
export class AreaModule { }
