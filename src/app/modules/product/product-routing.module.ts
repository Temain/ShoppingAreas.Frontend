import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';

import { ProductComponent } from './pages/product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: ':id', component: ProductEditComponent }
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

export class ProductRouter {
}
