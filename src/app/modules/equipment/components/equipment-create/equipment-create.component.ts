import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.scss']
})
export class EquipmentCreateComponent implements OnInit {
  equipment: Equipment;
  equipmentCreateForm: FormGroup;
  errors = '';

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.equipmentCreateForm = this.formBuilder
      .group({
        name: [null, [Validators.required, Validators.maxLength(200)]],
        length: [null, [Validators.required]],
        width: [null, [Validators.required]]
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.equipmentCreateForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const controls = this.equipmentCreateForm.controls;

    // Validation
    if (this.equipmentCreateForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    /** Обработка данных формы */
    this.equipment = new Equipment();
    this.equipment.name = this.equipmentCreateForm.controls.name.value;
    this.equipment.length = this.equipmentCreateForm.controls.length.value;
    this.equipment.width = this.equipmentCreateForm.controls.width.value;

    this.equipmentService.createEquipment(this.equipment)
      .subscribe(_ => {
        this.router.navigate(['/equipments']);
      }, response => {
        debugger
        this.errors = response.error;
        throw response;
      });
  }
}
