import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { ProductService } from './product.service';
import { Product } from './../interfaces/Product';


export class ProductsDataSource implements DataSource<Product> {
  private _productSubject = new BehaviorSubject<Product[]>([]);

  constructor(private _productService: ProductService) { }

  loadProducts(filter: string,
    pageNumber: number,
    pageSize: number) {
    this._productService.getProducts(filter, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => console.log('finalize'))
      )
      .subscribe(products => this._productSubject.next(products));
  }

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this._productSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._productSubject.complete();
  }
}