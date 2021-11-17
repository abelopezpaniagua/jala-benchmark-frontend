import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/interfaces/Product';

export enum ProductDialogActionType {
  CREATE_PRODUCT,
  UPDATE_PRODUCT
}

export interface ProductDialogData {
  product: Product,
  action: ProductDialogActionType
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  public productForm!: FormGroup;
  public currentDialogAction: ProductDialogActionType = ProductDialogActionType.CREATE_PRODUCT;

  public dialogActionType = ProductDialogActionType;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      code: new FormControl(this.data.product.code, [Validators.required]),
      name: new FormControl(this.data.product.name, [Validators.required]),
      description: new FormControl(this.data.product.description, []),
      price: new FormControl(this.data.product.price, [Validators.required]),
      discountPrice: new FormControl(this.data.product.discountPrice, []),
      inStock: new FormControl(this.data.product.inStock, [Validators.required]),
    });

    this.currentDialogAction = this.data.action;
  }

  processForm(form: any) {
    const product: Product = {
      id: this.currentDialogAction === ProductDialogActionType.UPDATE_PRODUCT ? this.data.product.id : 0,
      code: form.code,
      name: form.name,
      description: form.description,
      price: form.price,
      discountPrice: form.discountPrice,
      inStock: form.inStock
    };

    this.dialogRef.close(product);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
