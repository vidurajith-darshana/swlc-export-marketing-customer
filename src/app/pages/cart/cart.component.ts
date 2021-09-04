import {Component, OnInit} from '@angular/core';
import {CartItems} from '../model/cart-items';
import {OrderService} from '../service/customer-web-services/order.service';
import {AlertService} from '../_alert';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

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
        private router: Router,
        private ntService:NotifierService
    ) {
    }

    private productList: CartItems[];
    private itemTotalAmount: any;
    private orderTotalAmount: any;
    private message: string;

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
                this.ntService.notify('success','Your order has been successfully placed. Thank you!');
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

    clearText(){
        this.productList = [];
        this.itemTotalAmount = 0;
        this.orderTotalAmount = 0;
        this.message = '';
    }

    itemQtyOnChange(value,itemId,unitPrice){
        let find = this.productList.find(name => name.itemId === itemId);
        if (find !== null) {
            find.itemQty = value;
            find.subTotal = value * unitPrice;
        }
        localStorage.setItem('itemList', JSON.stringify(this.productList));
        this._getAddToCartItems();
    }

}
