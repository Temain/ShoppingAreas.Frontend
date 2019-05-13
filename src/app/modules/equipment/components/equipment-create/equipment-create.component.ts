import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/models/area';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.scss']
})
export class EquipmentCreateComponent implements OnInit {

  breadcombTitle = "Новая торговая площадь";
  breadcombText = "Все поля формы обязательны для заполнения";

  area: Area;
  areaCreateForm: FormGroup;
  errors = '';

  constructor(
    private areaService: AreaService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.areaCreateForm = this.formBuilder
      .group({
        name: [null, [Validators.required, Validators.maxLength(200)]],
        address: [null, [Validators.required, Validators.maxLength(250)]]
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.areaCreateForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const controls = this.areaCreateForm.controls;

    // Validation
    if (this.areaCreateForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    /** Обработка данных формы */
    this.area = new Area();
    this.area.name = this.areaCreateForm.controls.name.value;
    this.area.address = this.areaCreateForm.controls.address.value;

    this.areaService.createArea(this.area)
      .subscribe(_ => {
        this.router.navigate(['/areas']);
      }, response => {
        debugger
        this.errors = response.error;
        throw response;
      });
  }
}
