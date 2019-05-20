import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './pages/reports.component';
import { AreaCoeffsComponent } from './components/area-coeffs/area-coeffs.component';
import { AuthGuard } from 'src/app/auth.guard';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ReportsRouter } from './reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { ReportsServiceModule } from 'src/app/shared/modules/reports-service.module';
import { ProductCoeffsComponent } from './components/product-coeffs/product-coeffs.component';
import { CoeffsListComponent } from './components/coeffs-list/coeffs-list.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ReportsComponent, AreaCoeffsComponent, ReportsListComponent, ProductCoeffsComponent, CoeffsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRouter,
    ReportsServiceModule,
    ChartsModule 
  ],
  providers: [AuthGuard]
})
export class ReportsModule { }
