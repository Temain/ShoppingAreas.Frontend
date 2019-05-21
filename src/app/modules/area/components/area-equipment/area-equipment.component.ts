import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/shared/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-equipment',
  templateUrl: './area-equipment.component.html',
  styleUrls: ['./area-equipment.component.scss']
})
export class AreaEquipmentComponent implements OnInit {

  areaId: number;

  areaEquipmentForm: FormGroup;
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
  }

  initForm() {
    this.areaEquipmentForm = this.formBuilder
      .group({
        id: [null],
        name: [null, [Validators.required, Validators.maxLength(200)]],
        address: [null, [Validators.required, Validators.maxLength(250)]]
      });
  }
}
