import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { EquipmentServiceModule } from '../modules/equipment-service.module';

import { BaseService } from './common/base.service';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: EquipmentServiceModule
})
export class EquipmentService extends BaseService {

    private apiUri: string;

    constructor(private http: HttpClient) {
      super();
      this.apiUri = environment.apiUri;
    }

    getEquipments(searchPattern: string = null): Observable<Equipment[]> {
      let params = new HttpParams();
      if (searchPattern) {
        params = params.set('searchPattern', searchPattern);
      }
      return this.http.get<Equipment[]>(this.apiUri + '/equipments', { params });
    }

    getEquipment(id: number): Observable<Equipment> {
      return this.http.get<Equipment>(this.apiUri + '/equipments/' + id.toString());
    }

    createEquipment(equipment: Equipment): Observable<Equipment> {
      const body = JSON.stringify(equipment);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/equipments';
      return this.http.post<Equipment>(uri, body, httpOptions);
    }

    editEquipment(equipment: Equipment): Observable<Equipment> {
      const body = JSON.stringify(equipment);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/equipments/' + equipment.id;
      return this.http.put<Equipment>(uri, body, httpOptions);
    }

    deleteEquipment(id: number): Observable<Equipment> {
      const uri = environment.apiUri + '/equipments/' + id;
      return this.http.delete<Equipment>(uri);
    }
}
