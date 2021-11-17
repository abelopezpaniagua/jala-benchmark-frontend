import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns = ["code", "name", "price", "inStock", "actions"];

  totalRows: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchProductsInput') searchInput!: ElementRef;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.dataSource = new ProductsDataSource(this._productService);
    this.dataSource.loadProducts('', 1, 3);

    this.dataSource.totalRows.subscribe((count) => {
      this.totalRows = count;
    });
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.populateProducts();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.populateProducts())
      )
      .subscribe();
  }

  public populateProducts() {
    this.dataSource.loadProducts(
      this.searchInput.nativeElement.value,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  goToProductDetails(): void {
    console.log('go to details');
  }

  openCreateProductModal(): void {
    console.log('open create product modal');
  }

  openEditProductModal(): void {
    console.log('open edit product modal');
  }

  deleteProduct(): void {
    console.log('delete product');
  }
}
