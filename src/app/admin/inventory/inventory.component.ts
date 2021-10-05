import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent {
  products = [];
  productsExtra = [];
  productIndex = -1;
  edit = true;
  name;
  stock;
  description;
  quantity;
  unit;
  price;

  constructor() { 
    if (this.products.length < 4) {
      this.productsExtra = Array(4 - this.products.length).fill(0).map((x,i)=>i);
    }
  }
}