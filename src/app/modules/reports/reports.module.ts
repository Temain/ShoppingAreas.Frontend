import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './pages/reports.component';
import { AreaCoeffsComponent } from './components/area-coeffs/area-coeffs.component';
import { AuthGuard } from 'src/app/auth.guard';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ReportsRouter } from './reports-routing.module';

@NgModule({
  declarations: [ReportsComponent, AreaCoeffsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRouter
  ],
  providers: [AuthGuard]
})
export class ReportsModule { }
