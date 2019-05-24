import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { AreaServiceModule } from '../modules/area-service.module';

import { BaseService } from './common/base.service';
import { Area } from '../models/area';
import { EquipmentArea } from '../models/equipment-area';
import { ProductArea } from '../models/product-area';

@Injectable({
    providedIn: AreaServiceModule
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

    getEquipmentArea(areaId: string, all: boolean): Observable<EquipmentArea[]> {
      let params = new HttpParams();
      if (areaId) {
        params = params.set('areaId', areaId);
      }
      params = params.set('all', all.toString());
      return this.http.get<EquipmentArea[]>(this.apiUri + '/equipmentsarea', { params });
    }

    addEquipmentArea(equipArea: EquipmentArea): Observable<EquipmentArea> {
      const body = JSON.stringify(equipArea);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/equipmentsarea/';
      return this.http.post<EquipmentArea>(uri, body, httpOptions);
    }

    editEquipmentArea(areaId: string, equipmentId: string, equipArea: EquipmentArea): Observable<Area> {
      const body = JSON.stringify(equipArea);
      let params = new HttpParams();
      params = params.set('areaId', areaId);
      params = params.set('equipmentId', equipmentId);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params
      };

      const uri = environment.apiUri + '/equipmentsarea/';
      return this.http.put<Area>(uri, body, httpOptions);
    }

    deleteEquipmentArea(areaId: string, id: string): Observable<EquipmentArea> {
      let params = new HttpParams();
      params = params.set('areaId', areaId);
      params = params.set('equipmentId', id);
      const uri = environment.apiUri + '/equipmentsarea';
      return this.http.delete<EquipmentArea>(uri, { params });
    }

    getProductArea(areaId: string): Observable<ProductArea[]> {
      let params = new HttpParams();
      params = params.set('areaId', areaId);
      return this.http.get<ProductArea[]>(this.apiUri + '/productsarea', { params });
    }

    addProductArea(productArea: ProductArea): Observable<ProductArea> {
      const body = JSON.stringify(productArea);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/productsarea/';
      return this.http.post<ProductArea>(uri, body, httpOptions);
    }

    deleteProductArea(id: string): Observable<ProductArea> {
      const uri = environment.apiUri + '/productsarea/' + id;
      return this.http.delete<ProductArea>(uri);
    }
}
