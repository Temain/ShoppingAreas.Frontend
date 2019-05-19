import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcomb',
  templateUrl: './breadcomb.component.html',
  styleUrls: ['./breadcomb.component.scss']
})
export class BreadcombComponent implements OnInit {
  url: string;
  id: number;
  title: string;
  text: string;
  iconClass: string;
  showCreate = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.id = params.id;
      });
  }

  ngOnInit() {
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
      case '/areas/' + this.id: {
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
      case '/equipments/create': {
        this.title = "Новое оборудование";
        this.text = "Все поля обязательны для заполнения";
        this.iconClass = "notika-app";
        this.showCreate = true;
        break;
      }
      case '/equipments/' + this.id: {
        this.title = "Редактирование оборудования";
        this.text = "Все поля обязательны для заполнения";
        this.iconClass = "notika-house";
        break;
      }
      case '/products': {
        this.title = "Категории товаров";
        this.text = "Список категорий товаров реализуемых на торговой площади";
        this.iconClass = "notika-windows";
        this.showCreate = true;
        break;
      }
      case '/products/create': {
        this.title = "Новая категория товаров";
        this.text = "Все поля обязательны для заполнения";
        this.iconClass = "notika-app";
        this.showCreate = true;
        break;
      }
      case '/products/' + this.id: {
        this.title = "Редактирование категории товаров";
        this.text = "Все поля обязательны для заполнения";
        this.iconClass = "notika-house";
        break;
      }
      case '/reports': {
        this.title = "Аналитика";
        this.text = "Результаты проведения оценки эффективности использования торговых помещений";
        this.iconClass = "notika-bar-chart";
        this.showCreate = false;
        break;
      }
      case '/reports/' + this.id: {
        this.title = "Аналитика";
        this.text = "Результаты проведения оценки эффективности использования торговых помещений";
        this.iconClass = "notika-bar-chart";
        this.showCreate = false;
        break;
      }
    }
  }

}
