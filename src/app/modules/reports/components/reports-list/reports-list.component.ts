import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReportsService } from 'src/app/shared/services/reports.service';
import { AreaReport } from 'src/app/shared/models/area.report';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  reports: AreaReport[];

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.reportsService.getReports()
      .subscribe(reports => {
        this.reports = reports;
      });
  }
}
