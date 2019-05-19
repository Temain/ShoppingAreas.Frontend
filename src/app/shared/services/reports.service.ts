import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ReportsServiceModule } from '../modules/reports-service.module';

import { BaseService } from './common/base.service';
import { AreaReport } from '../models/area.report';

@Injectable({
    providedIn: ReportsServiceModule
})
export class ReportsService extends BaseService {
  private apiUri: string;

  constructor(private http: HttpClient) {
    super();
    this.apiUri = environment.apiUri;
  }

  getReports(): Observable<AreaReport[]> {
    return this.http.get<AreaReport[]>(this.apiUri + '/reports', { });
  }

  getReport(id: number): Observable<AreaReport> {
    return this.http.get<AreaReport>(this.apiUri + '/reports/' + id.toString());
  }
}
