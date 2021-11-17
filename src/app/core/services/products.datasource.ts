import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { ProductService } from './product.service';
import { Product } from './../interfaces/Product';


export class ProductsDataSource implements DataSource<Product> {
  private _productSubject = new BehaviorSubject<Product[]>([]);

  public totalRows = new BehaviorSubject<number>(0);

  constructor(private _productService: ProductService) { }

  loadProducts(filter: string,
    pageNumber: number,
    pageSize: number) {
    this._productService.getProducts(filter, pageNumber, pageSize)
      .pipe(
        catchError(() => of([]))
      )
      .subscribe((pagedProducts: any) => {
        this._productSubject.next(pagedProducts.results)
        this.totalRows.next(pagedProducts.rowCount)
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this._productSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._productSubject.complete();
  }
}
