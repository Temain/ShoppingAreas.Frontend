import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/models/area';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.scss']
})
export class AreaCreateComponent implements OnInit {

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
        name: [null, [Validators.required, Validators.maxLength(200)]]
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

    this.areaService.createArea(this.area)
      .subscribe(_ => {
        this.router.navigate(['/areas']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
