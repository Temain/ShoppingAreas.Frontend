import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { AreaService } from 'src/app/shared/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment';
import { map } from 'rxjs/operators';
import { EquipmentArea } from 'src/app/shared/models/equipment-area';

@Component({
  selector: 'app-area-equipment',
  templateUrl: './area-equipment.component.html',
  styleUrls: ['./area-equipment.component.scss']
})
export class AreaEquipmentComponent implements OnInit {

  areaId: string;
  equipment: EquipmentArea[] = [];
  selected: EquipmentArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService) {

    this.route.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
    this.areaService.getEquipmentArea(this.areaId, true)
      // .pipe(
      //   map((equips) => equips.map(eq => 
      //     new EquipmentArea(eq.id, eq.name, this.areaId, 1, eq.length, eq.width)))
      // )
      .subscribe(response => {
        this.equipment = response;
      })

    this.areaService.getEquipmentArea(this.areaId, false)
      .subscribe(response => {
        this.selected = response;
      });
  }
 
  onChange(equipArea) {
    this.areaService.editEquipmentArea(this.areaId, equipArea.equipmentId, equipArea)
      .subscribe(response => {});
  }
  
  drop(event: CdkDragDrop<string[]>, cntName: string) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, 
        event.previousIndex, event.currentIndex);
      const item: any = event.container.data[event.currentIndex];
      if (cntName == "left") {
        item.count = 1;
        this.areaService.addEquipmentArea(item)
          .subscribe(response => {});
      } else {
        this.areaService.deleteEquipmentArea(this.areaId, item.equipmentId) 
          .subscribe(response => {});
      }
    } else {
      moveItemInArray(this.selected, event.previousIndex, event.currentIndex);
    }
  }
}
