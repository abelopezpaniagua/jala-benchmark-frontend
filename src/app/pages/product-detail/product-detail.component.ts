import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from 'src/app/core/interfaces/Product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this._productService.getProduct(params.id)
          .toPromise()
          .then((product) => {
            this.product = product;
          });
      }
    });
  }

  goToProductList() {
    this._router.navigate(['products']);
  }

}
