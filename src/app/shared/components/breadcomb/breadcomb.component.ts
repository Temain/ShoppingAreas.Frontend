import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcomb',
  templateUrl: './breadcomb.component.html',
  styleUrls: ['./breadcomb.component.scss']
})
export class BreadcombComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
