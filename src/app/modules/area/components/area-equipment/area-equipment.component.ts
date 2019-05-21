import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { AreaService } from 'src/app/shared/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment';

export interface Todo {
  title: string;
  date: string;
  poster : string;
}

@Component({
  selector: 'app-area-equipment',
  templateUrl: './area-equipment.component.html',
  styleUrls: ['./area-equipment.component.scss']
})
export class AreaEquipmentComponent implements OnInit {

  areaId: number;
  equipment: Equipment[] = [];
  selected: Equipment[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private areaService: AreaService,
    private equipmentService: EquipmentService) {

    this.route.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
    this.equipmentService.getEquipments()
      .subscribe(response => {
        this.equipment = response;
      })
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,event.container.data, 
        event.previousIndex, event.currentIndex)
    } else {
      moveItemInArray(this.selected, event.previousIndex, event.currentIndex);
    }
  }
}
