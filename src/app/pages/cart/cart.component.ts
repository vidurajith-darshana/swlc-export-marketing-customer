import {Component, OnInit} from '@angular/core';
import {CartItems} from '../model/cart-items';
import {OrderService} from '../service/customer-web-services/order.service';
import {AlertService} from '../_alert';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    constructor(
        private orderService: OrderService,
        protected alertService: AlertService,
        private router: Router
    ) {
    }

    private productList: CartItems[];
    private itemTotalAmount: any;
    private orderTotalAmount: any;
    private message: string;

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

    private _getAddToCartItems() {
        this.productList = JSON.parse(localStorage.getItem('itemList'));
        let orderTotal = 0;
        for (let i in this.productList) {
            let item = this.productList[i];
            let itemSubTot = item.subTotal;
            orderTotal += itemSubTot;
        }
        this.itemTotalAmount = orderTotal.toFixed(2);
        this.orderTotalAmount = orderTotal.toFixed(2);
    }

    private _removeItemFromCart(itemId) {
        this.productList = JSON.parse(localStorage.getItem('itemList'));
        localStorage.removeItem('itemList');
        let item = this.productList.find(name => name.itemId === itemId);
        if (item !== null) {
            this.productList.splice(this.productList.indexOf(item), 1);
        }
        localStorage.setItem('itemList', JSON.stringify(this.productList));
        this._getAddToCartItems();
    }

    private _saveOrder() {
        let fkUserId = JSON.parse(localStorage.getItem('loggedUserId'));
        this.orderService.saveOrder(fkUserId, this.orderTotalAmount, this.message, 'PENDING').subscribe((data) => {
            if (data['success']) {
                this.alertService.success('Order Save success', this.options);
                const itemList = new Array();
                localStorage.setItem('itemList', JSON.stringify(itemList));
                this._getAddToCartItems();

                this.itemTotalAmount = '';
                this.orderTotalAmount = '';
                this.message = '';

            } else {
                this.alertService.error(data['message'], this.options);
            }
        }, error => {
            this.alertService.error('Order save failed!', this.options);
        });
    }

    _continueToShopping() {
        this.router.navigate(['/categories']);
    }

    _clearAllItems() {
        localStorage.removeItem('itemList');
        const itemList = new Array();
        localStorage.setItem('itemList', JSON.stringify(itemList));
        this._getAddToCartItems();
    }

    itemQtyOnChange(value, itemId, unitPrice) {
        let find = this.productList.find(name => name.itemId === itemId);
        if (find !== null) {
            find.itemQty = value;
            find.subTotal = value * unitPrice;
        }
        localStorage.setItem('itemList', JSON.stringify(this.productList));
        this._getAddToCartItems();
    }

}
