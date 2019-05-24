import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  product: Product;
  productCreateForm: FormGroup;
  errors = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productCreateForm = this.formBuilder
      .group({
        name: [null, [Validators.required, Validators.maxLength(200)]]
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.productCreateForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const controls = this.productCreateForm.controls;

    // Validation
    if (this.productCreateForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    /** Обработка данных формы */
    this.product = new Product();
    this.product.name = this.productCreateForm.controls.name.value;

    this.productService.createProduct(this.product)
      .subscribe(_ => {
        this.router.navigate(['/products']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
