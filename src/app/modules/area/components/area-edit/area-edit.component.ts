import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/models/area';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss']
})
export class AreaEditComponent implements OnInit {

  breadcombTitle = "Редактирование торговой площади";
  breadcombText = "Все поля формы обязательны для заполнения";

  areaId: number;
  area: Area;

  areaEditForm: FormGroup;
  errors = '';

  constructor(
    private areaService: AreaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.route.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
    this.initForm();

    this.areaService.getArea(this.areaId)
      .subscribe(response => {
        this.area = response;

        this.setValues();
      });
  }

  initForm() {
    this.areaEditForm = this.formBuilder
      .group({
        id: [null],
        name: [null, [Validators.required, Validators.maxLength(200)]],
        address: [null, [Validators.required, Validators.maxLength(250)]]
      });
  }

  setValues() {
    this.areaEditForm.patchValue({
      id: this.area.id,
      name: this.area.name,
      address: this.area.address
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.areaEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const controls = this.areaEditForm.controls;

    // Validation
    if (this.areaEditForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    /** Обработка данных формы */
    this.area.name = this.areaEditForm.controls.name.value;

    this.areaService.editArea(this.area)
      .subscribe(_ => {
        this.router.navigate(['/areas']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
