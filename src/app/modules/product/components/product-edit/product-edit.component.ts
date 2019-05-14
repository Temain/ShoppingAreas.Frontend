import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId: number;
  product: Product;

  productEditForm: FormGroup;
  errors = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.route.params.subscribe(params => {
      this.productId = params.id;
    });
  }

  ngOnInit() {
    this.initForm();

    this.productService.getProduct(this.productId)
      .subscribe(response => {
        this.product = response;

        this.setValues();
      });
  }

  initForm() {
    this.productEditForm = this.formBuilder
      .group({
        id: [null],
        name: [null, [Validators.required, Validators.maxLength(200)]]
      });
  }

  setValues() {
    this.productEditForm.patchValue({
      id: this.product.id,
      name: this.product.name
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.productEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const controls = this.productEditForm.controls;

    // Validation
    if (this.productEditForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    /** Обработка данных формы */
    this.product.name = this.productEditForm.controls.name.value;

    this.productService.editProduct(this.product)
      .subscribe(_ => {
        this.router.navigate(['/products']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
