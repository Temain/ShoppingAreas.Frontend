import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

import { ReportsComponent } from './pages/reports.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { AreaCoeffsComponent } from './components/area-coeffs/area-coeffs.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReportsComponent,
    children: [
      { path: '', component: ReportsListComponent },
      { path: ':id', component: AreaCoeffsComponent }
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
