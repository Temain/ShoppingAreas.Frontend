import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Equipment } from 'src/app/shared/models/equipment';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[];
  deleteResult: string;

  constructor(
    private equipmentService: EquipmentService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.equipmentService.getEquipments()
      .subscribe(equipments => {
        this.equipments = equipments;
      });
  }

  confirmDelete(content, equipmentId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-confirm-title'}).result.then((result) => {
      this.deleteEquipment(equipmentId);
      this.deleteResult = `Closed with: ${result}`;
    }, (reason) => {
      this.deleteResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteEquipment(id) {
    this.equipmentService.deleteEquipment(id)
      .subscribe(_ => {
        const index = this.equipments
          .map(x => x.id)
          .indexOf(id);
        this.equipments.splice(index, 1);
      }, response => {
        // this.errors = response.error;
        throw response;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
