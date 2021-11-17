import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { ProductService } from './../../core/services/product.service';
import { ProductsDataSource } from './../../core/services/products.datasource';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  dataSource!: ProductsDataSource;
  displayedColumns = ["code", "name", "price"];

  @ViewChild('searchProductsInput') searchInput!: ElementRef;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.dataSource = new ProductsDataSource(this._productService);
    this.dataSource.loadProducts('', 1, 3);
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.populateProducts();
        })
      )
      .subscribe();
  }

  public populateProducts() {
    this.dataSource.loadProducts(this.searchInput.nativeElement.value, 1, 3);
  }
}
