import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { AreaService } from 'src/app/shared/services/area.service';
import { ActivatedRoute } from '@angular/router';
import { ProductArea } from 'src/app/shared/models/product-area';

@Component({
  selector: 'app-area-product',
  templateUrl: './area-product.component.html',
  styleUrls: ['./area-product.component.scss']
})
export class AreaProductComponent implements OnInit {

  areaId: string;
  products: ProductArea[] = [];
  selected: ProductArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService) {

    this.route.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
    this.areaService.getProductArea(this.areaId, true)
      .subscribe(response => {
        this.products = response;
      })

    this.areaService.getProductArea(this.areaId, false)
      .subscribe(response => {
        this.selected = response;
      });
  }
 
  onChange(productArea) {
    this.areaService.editProductArea(this.areaId, productArea.productId, productArea)
      .subscribe(response => {});
  }
  
  drop(event: CdkDragDrop<string[]>, cntName: string) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, 
        event.previousIndex, event.currentIndex);
      const item: any = event.container.data[event.currentIndex];
      if (cntName == "left") {
        item.count = 1;
        this.areaService.addProductArea(item)
          .subscribe(response => {});
      } else {
        this.areaService.deleteProductArea(this.areaId, item.productId) 
          .subscribe(response => {});
      }
    } else {
      moveItemInArray(this.selected, event.previousIndex, event.currentIndex);
    }
  }

}
