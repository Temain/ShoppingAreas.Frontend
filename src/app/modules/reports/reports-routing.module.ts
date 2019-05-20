import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

import { ReportsComponent } from './pages/reports.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { AreaCoeffsComponent } from './components/area-coeffs/area-coeffs.component';
import { CoeffsListComponent } from './components/coeffs-list/coeffs-list.component';
import { ProductCoeffsComponent } from './components/product-coeffs/product-coeffs.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReportsComponent,
    children: [
      { 
        path: '', 
        component: ReportsListComponent 
      },
      { 
        path: ':id', 
        component: CoeffsListComponent,
        children: [
          { path: '', redirectTo: 'area' },
          { path: 'area', component: AreaCoeffsComponent },
          { path: 'products', component: ProductCoeffsComponent }
        ],
      }
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

export class ReportsRouter {
}
