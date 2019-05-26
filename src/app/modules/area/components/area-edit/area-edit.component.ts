import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/models/area';
import { FileEntity } from 'src/app/shared/models/file-entity';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss']
})
export class AreaEditComponent implements OnInit {
  areaId: number;
  area: Area;

  areaEditForm: FormGroup;

  imageData: string;
  @ViewChild('imageInput') imageInput: ElementRef;

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
        address: [null, [Validators.required, Validators.maxLength(250)]],
        imagePath: [null],
        imageData: [null]
      });
  }

  setValues() {
    this.areaEditForm.patchValue({
      id: this.area.id,
      name: this.area.name,
      address: this.area.address,
      imagePath: this.area.imagePath
    });

    this.imageData = this.area && this.area.image
      ? this.area.image.fileData : '';
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.areaEditForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onImageChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            const imageData = reader.result.toString();
            this.imageData = imageData;
            this.areaEditForm.get('imageData')
                .setValue({
                    fileName: file.name,
                    fileType: file.type,
                    fileData: imageData
                });
        };
    }
  }

  clearImage() {
    this.areaEditForm.get('imageData').setValue(null);
    this.imageInput.nativeElement.value = '';
    this.imageData = '';
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
    this.area.address = this.areaEditForm.controls.address.value;
    this.area.imagePath = this.areaEditForm.controls['imagePath'].value;

    const image = this.areaEditForm.controls['imageData'].value;
    if (image) {
        this.area.image = new FileEntity(image.fileName, image.fileType, image.fileData.split(',')[1]);
    } else {
        this.area.image = null;
    }

    this.areaService.editArea(this.area)
      .subscribe(_ => {
        this.router.navigate(['/areas']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
