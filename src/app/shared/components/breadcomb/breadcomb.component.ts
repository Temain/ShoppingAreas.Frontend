import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcomb',
  templateUrl: './breadcomb.component.html',
  styleUrls: ['./breadcomb.component.scss']
})
export class BreadcombComponent implements OnInit {
  url: string;
  title: string;
  text: string;
  iconClass: string;
  showCreate = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    debugger
    this.url = this.router.url;
    switch(this.url) {
      case '/areas': {
        this.title = "Торговые площади";
        this.text = "Список торговых площадей для оценки эффективности использования";
        this.iconClass = "notika-house";
        this.showCreate = true;
        break;
      }
      case '/areas/create': {
        this.title = "Новая торговая площадь";
        this.text = "Все поля обязательны для заполнения";
        this.iconClass = "notika-house";
        break;
      }
      case '/areas/edit': {
        this.title = "Редактирование торговой площади";
        this.text = "Все поля обязательны для заполнения";
        this.iconClass = "notika-house";
        break;
      }
      case '/equipments': {
        this.title = "Оборудование";
        this.text = "Список оборудования размещаемого в торговых помещениях";
        this.iconClass = "notika-app";
        this.showCreate = true;
        break;
      }
      case '/products': {
        this.title = "Категории товаров";
        this.text = "Список категорий товаров реализуемых на торговой площади";
        this.iconClass = "notika-windows";
        this.showCreate = true;
        break;
      }
      case '/reports': {
        this.title = "Аналитика";
        this.text = "Результаты проведения оценки эффективности использования торговых помещений";
        this.iconClass = "notika-bar-chart";
        this.showCreate = true;
        break;
      }
    }
  }

}
