import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AreaService } from 'src/app/shared/services/area.service';
import { Area } from 'src/app/shared/models/area';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  areas: Area[];
  deleteResult: string;

  constructor(
    private areaService: AreaService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.areaService.getAreas()
      .subscribe(areas => {
        this.areas = areas;
      });
  }

  confirmDelete(content, areaId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-confirm-title'}).result.then((result) => {
      this.deleteArea(areaId);
      this.deleteResult = `Closed with: ${result}`;
    }, (reason) => {
      this.deleteResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteArea(id) {
    this.areaService.deleteArea(id)
      .subscribe(_ => {
        const index = this.areas
          .map(x => x.id)
          .indexOf(id);
        this.areas.splice(index, 1);
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
