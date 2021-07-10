import {Component, OnInit} from '@angular/core';
import {CartItems} from "../model/cart-items";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor() {
    }

    private productList : CartItems[];
    private itemTotalAmount : any;

    product = [

        {
            productImg: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/1383/e7789469178cc18cf93ad058141fbce6adcdd7a6093ea9f12fda5c52c990b9b2a/A',
            productName: 'Cumin Powder',
            productPrice: '$ 10.23',
            productQty: '12',
            Subtotal: '$154.00'
        },
        {
            productImg: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/4894/f9e5c77ece54c0be8429309c4eec2e7a5bf9b62c1cb73d52309de4eca631dc8ca/A',
            productName: 'Garlic Powder',
            productPrice: '$12.36',
            productQty: '1',
            Subtotal: '$24.00'
        },
        {
            productImg: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/1323/bb84496c92fd35ece3cefd6bb79bd94cac0b5d4c99eb7e172678efa41165c73ba/A',
            productName: 'Chili Powder',
            productPrice: '$7.23',
            productQty: '6',
            Subtotal: '$100.00'
        },
        {
            productImg: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/1383/e7789469178cc18cf93ad058141fbce6adcdd7a6093ea9f12fda5c52c990b9b2a/A',
            productName: 'Cumin Powder',
            productPrice: '$ 10.23',
            productQty: '12',
            Subtotal: '$154.00'
        },
        {
            productImg: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/4894/f9e5c77ece54c0be8429309c4eec2e7a5bf9b62c1cb73d52309de4eca631dc8ca/A',
            productName: 'Garlic Powder',
            productPrice: '$12.36',
            productQty: '1',
            Subtotal: '$24.00'
        },

    ];

    ngOnInit(): void {
        this._getAddToCartItems();
    }

    private _getAddToCartItems(){
         this.productList = JSON.parse(localStorage.getItem('itemList'));
         let orderTotal = 0;
         for (let i in this.productList){
             let item = this.productList[i];
             let itemSubTot = item.subTotal;
             orderTotal += itemSubTot;
         }
         this.itemTotalAmount = orderTotal.toFixed(2);
    }

}
