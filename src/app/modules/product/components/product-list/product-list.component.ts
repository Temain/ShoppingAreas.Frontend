import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  breadcombTitle = "Категории товаров";
  breadcombText = "Список категорий товаров реализуемых на торговой площади";
  products: Product[];
  deleteResult: string;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  confirmDelete(content, productId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-confirm-title'}).result.then((result) => {
      this.deleteProduct(productId);
      this.deleteResult = `Closed with: ${result}`;
    }, (reason) => {
      this.deleteResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(_ => {
        const index = this.products
          .map(x => x.id)
          .indexOf(id);
        this.products.splice(index, 1);
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
