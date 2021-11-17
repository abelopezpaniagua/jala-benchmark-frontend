import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Product } from 'src/app/core/interfaces/Product';
import { ProductService } from './../../core/services/product.service';
import { ProductsDataSource } from './../../core/services/products.datasource';
import { ProductDialogComponent, ProductDialogActionType } from './../../components/product-dialog/product-dialog.component';

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

  product: Product = {
    id: 0,
    code: '',
    name: '',
    description: '',
    price: 0,
    discountPrice: 0,
    inStock: false
  };

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _productService: ProductService) { }

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

  populateProducts() {
    this.dataSource.loadProducts(
      this.searchInput.nativeElement.value,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  goToProductDetails(productId: number): void {
    this._router.navigate([`products/${productId}`]);
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: { product: this.product, action: ProductDialogActionType.CREATE_PRODUCT }
    });

    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product) {
        this._productService.createProduct(product)
          .toPromise()
          .then(() => console.log('created'));
      }

      this.resetCurrentProduct();
    });
  }

  openEditProductDialog(product: Product): void {
    this.product = product;

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: { product: this.product, action: ProductDialogActionType.UPDATE_PRODUCT }
    });

    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product) {
        this._productService.updateProduct(product.id, product)
          .toPromise()
          .then(() => console.log('updated'));
      }

      this.resetCurrentProduct();
    });
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: `Delete Product: ${product.code}`,
        message: 'Are you sure you want to delete this item?',
        accepted: false
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._productService.deleteProduct(product.id)
          .toPromise()
          .then(() => console.log('deleted'));
      }
    });
  }

  private resetCurrentProduct() {
    this.product = {
      id: 0,
      code: '',
      name: '',
      description: '',
      price: 0,
      discountPrice: 0,
      inStock: false
    };
  }
}
