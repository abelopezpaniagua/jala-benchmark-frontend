import { PagedResult } from './../interfaces/PagedResult';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { Product } from './../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private baseUri: string = 'products'

  constructor(_http: HttpClient) {
    super(_http);
  }

  public getProducts(filter: string = '',
    pageNumber: number = 1,
    pageSize: number = 10): Observable<PagedResult<Product>> {
    return this.get<PagedResult<Product>>(this.baseUri, new HttpParams()
      .set('searchFilter', filter)
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber));
  }

  public getProduct(id: number): Observable<Product> {
    return this.get<Product>(`${this.baseUri}/${id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.post<Product>(`${this.baseUri}`, product);
  }

  public updateProduct(id: number, product: Product): Observable<Product> {
    return this.put<Product>(`${this.baseUri}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.delete(`${this.baseUri}/${id}`);
  }
}
