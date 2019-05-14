import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ProductServiceModule } from '../modules/product-service.module';

import { BaseService } from './common/base.service';
import { Product } from '../models/product';

@Injectable({
    providedIn: ProductServiceModule
})
export class ProductService extends BaseService {

    private apiUri: string;

    constructor(private http: HttpClient) {
      super();
      this.apiUri = environment.apiUri;
    }

    getProducts(searchPattern: string = null): Observable<Product[]> {
      let params = new HttpParams();
      if (searchPattern) {
        params = params.set('searchPattern', searchPattern);
      }
      return this.http.get<Product[]>(this.apiUri + '/products', { params });
    }

    getProduct(id: number): Observable<Product> {
      return this.http.get<Product>(this.apiUri + '/products/' + id.toString());
    }

    createProduct(product: Product): Observable<Product> {
      const body = JSON.stringify(product);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/products';
      return this.http.post<Product>(uri, body, httpOptions);
    }

    editProduct(product: Product): Observable<Product> {
      const body = JSON.stringify(product);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const uri = environment.apiUri + '/products/' + product.id;
      return this.http.put<Product>(uri, body, httpOptions);
    }

    deleteProduct(id: number): Observable<Product> {
      const uri = environment.apiUri + '/products/' + id;
      return this.http.delete<Product>(uri);
    }
}
