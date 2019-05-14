import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product.component';
import { ProductRouter } from './product-routing.module'
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ProductServiceModule } from 'src/app/shared/modules/product-service.module';
import { AuthGuard } from 'src/app/auth.guard';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductEditComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    ProductRouter,
    ReactiveFormsModule,
    SharedModule,
    ProductServiceModule
  ],
  providers: [AuthGuard]
})
export class ProductModule { }
