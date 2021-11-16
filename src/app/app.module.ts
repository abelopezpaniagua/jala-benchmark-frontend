import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoriesListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
