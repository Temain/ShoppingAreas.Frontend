import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReportsService } from 'src/app/shared/services/reports.service';
import { AreaReport } from 'src/app/shared/models/area.report';

@Component({
  selector: 'app-area-coeffs',
  templateUrl: './area-coeffs.component.html',
  styleUrls: ['./area-coeffs.component.scss']
})
export class AreaCoeffsComponent implements OnInit {

  areaId: number;
  report: AreaReport;

  constructor(
    private reportsService: ReportsService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
    this.reportsService.getReport(this.areaId)
      .subscribe(response => {
        this.report = response;
      });
  }
}
