import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coeffs-list',
  templateUrl: './coeffs-list.component.html',
  styleUrls: ['./coeffs-list.component.scss']
})
export class CoeffsListComponent implements OnInit {

  areaId: number;

  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
  }
}
