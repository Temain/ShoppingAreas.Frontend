import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/shared/services/reports.service';
import { ProductReport } from 'src/app/shared/models/product.report';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-coeffs',
  templateUrl: './product-coeffs.component.html',
  styleUrls: ['./product-coeffs.component.scss']
})
export class ProductCoeffsComponent implements OnInit {

  areaId: number;
  reports: ProductReport[];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [{ data: [], label: '' }];

  constructor(
    private reportsService: ReportsService,
    private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.areaId = params.id;
    });
  }

  ngOnInit() {
    this.reportsService.getProductReports(this.areaId)
      .subscribe(reports => {
        this.reports = reports;
        this.barChartLabels = reports.map(i => i.name);
        const coefsIncome = this.reports.map(i => i.coefIncome);
        const coefsProfit = this.reports.map(i => i.coefProfit);
        this.barChartData = [
          { data: coefsIncome, label: 'К (по обороту)' },
          { data: coefsProfit, label: 'К (по прибыли)' }
        ]
      });
  }

}
