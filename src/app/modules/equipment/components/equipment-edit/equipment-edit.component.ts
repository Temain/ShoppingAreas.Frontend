import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {
  equipmentId: number;
  equipment: Equipment;

  equipmentEditForm: FormGroup;
  errors = '';

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.route.params.subscribe(params => {
      this.equipmentId = params.id;
    });
  }

  ngOnInit() {
    this.initForm();

    this.equipmentService.getEquipment(this.equipmentId)
      .subscribe(response => {
        this.equipment = response;

        this.setValues();
      });
  }

  initForm() {
    this.equipmentEditForm = this.formBuilder
      .group({
        id: [null],
        name: [null, [Validators.required, Validators.maxLength(200)]],
        length: [null, [Validators.required]],
        width: [null, [Validators.required]]
      });
  }

  setValues() {
    this.equipmentEditForm.patchValue({
      id: this.equipment.id,
      name: this.equipment.name,
      length: this.equipment.length,
      width: this.equipment.width
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.equipmentEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const controls = this.equipmentEditForm.controls;

    // Validation
    if (this.equipmentEditForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    /** Обработка данных формы */
    this.equipment.name = this.equipmentEditForm.controls.name.value;

    this.equipmentService.editEquipment(this.equipment)
      .subscribe(_ => {
        this.router.navigate(['/equipments']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
