import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/models/area';
import { FileEntity } from 'src/app/shared/models/file-entity';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.scss']
})
export class AreaCreateComponent implements OnInit {
  area: Area;
  areaCreateForm: FormGroup;
  errors = '';

  imageData: string;
  @ViewChild('imageInput') imageInput: ElementRef;

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
        address: [null, [Validators.required, Validators.maxLength(250)]],
        imagePath: [null],
        imageData: [null]
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.areaCreateForm.controls[controlName];
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
            this.areaCreateForm.get('imageData')
                .setValue({
                    fileName: file.name,
                    fileType: file.type,
                    fileData: imageData
                });
        };
    }
  }

  clearImage() {
    this.areaCreateForm.get('imageData').setValue(null);
    this.imageInput.nativeElement.value = '';
    this.imageData = '';
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
    this.area.imagePath = this.areaCreateForm.controls['imagePath'].value;

    const image = this.areaCreateForm.controls['imageData'].value;
    if (image) {
        this.area.image = new FileEntity(image.fileName, image.fileType, image.fileData.split(',')[1]);
    } else {
        this.area.image = null;
    }

    this.areaService.createArea(this.area)
      .subscribe(_ => {
        this.router.navigate(['/areas']);
      }, response => {
        this.errors = response.error;
        throw response;
      });
  }
}
