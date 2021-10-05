import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
  pinned = true;
  tabs = {
    "dashboard": {
      "img": "four-boxes"
    },
    "status view": {
      "img": "check-list",
      "details": [
        "List of Customers",
        "Top Customers",
        "No. of Viewers"
      ]
    },
    "inventory": {
      "img": "check-list",
      "details": [
        "Add Products",
        "Edit Product Details"
      ]
    },
    "order": {
      "img": "delivery-box",
      "details": [
        "Track Orders Live",
        "Pending Orders",
        "Customer Reivew"
      ]
    },
    "transport": {
      "img": "delivery-transport",
      "details": [
        "Transport Charges",
        "Pending Orders",
        "Customer Reivew"
      ]
    },
  };
  currentTab = "inventory";
  
  constructor() { }
}