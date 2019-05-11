import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { Area } from '../models/area';

@Injectable({
    providedIn: 'root'
})
export class AreaService extends BaseService {

    private apiUri: string;

    constructor(private http: HttpClient) {
      super();
      this.apiUri = environment.apiUri;
    }

    getAreas(searchPattern: string = null): Observable<Area[]> {
      let params = new HttpParams();
      if (searchPattern) {
        params = params.set('searchPattern', searchPattern);
      }

      return this.http.get<Area[]>(this.apiUri + '/areas', { params });
    }

    getArea(id: number): Observable<Area> {
      return this.http.get<Area>(this.apiUri + '/areas/' + id.toString());
    }

    createArea(area: Area): Observable<Area> {
      const body = JSON.stringify(area);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/areas';
      return this.http.post<Area>(uri, body, httpOptions);
    }

    editArea(area: Area): Observable<Area> {
      const body = JSON.stringify(area);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/areas/' + area.id;
      return this.http.put<Area>(uri, body, httpOptions);
    }

    deleteArea(id: number): Observable<Area> {
      const uri = environment.apiUri + '/areas/' + id;
      return this.http.delete<Area>(uri);
    }
}
