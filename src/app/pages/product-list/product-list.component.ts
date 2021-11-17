import { Component, OnInit } from '@angular/core';

import { ProductService } from './../../core/services/product.service';
import { ProductsDataSource } from './../../core/services/products.datasource';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  dataSource!: ProductsDataSource;
  displayedColumns = ["code", "name", "price"];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.populateProducts();
  }

  public populateProducts() {
    this.dataSource = new ProductsDataSource(this._productService);
    this.dataSource.loadProducts('', 1, 3);
  }
}
