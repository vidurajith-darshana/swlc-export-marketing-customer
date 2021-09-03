/* tslint:disable:max-line-length */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product';
import {ProductService} from '../service/customer-web-services/product.service';
import {AlertService} from '../_alert';
import {AuthenticateService} from '../service/common-services/authenticate.service';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    @ViewChild('closebutton') closebutton;

    orderby: string;
    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };
    private product: Product[];
    private quantity: number = 0;

    categoryName: string;

    sampleArray: [];

    constructor(
        private route: ActivatedRoute,
        protected alertService: AlertService,
        private productService: ProductService,
        private router: Router,
        private authService: AuthenticateService,
        private ntService: NotifierService
    ) {
        this.config = {
            itemsPerPage: 1,
            currentPage: 1,
            totalItems: 0
        };
    }

    config: any;
    items = [];

    pageChanged(event) {
        this.config.currentPage = event;
        const pagno = this.config.currentPage - 1;
        this.getProductsByCategoryId(this.orderby, pagno);
    }

    ngOnInit(): void {
        this.getctegoryid();
        this.getProductsByCategoryId(this.orderby, 0);

    }


    private getctegoryid() {
        this.route.queryParams
            .subscribe(params => {
                    this.orderby = params.id;
                    this.categoryName = params.name;
                }
            );
    }

    private getProductsByCategoryId(id, pageNO) {
        this.productService._getProductList(id, pageNO).subscribe((data: Object[]) => {
            this.product = data['body'].content;
            this.config.itemsPerPage = data['body'].size;
            this.config.totalItems = data['body'].totalElements;
        }, error => {

        });
    }

    private _addToCart(itemId, itemName, itemImage, itemPrice) {

        if (this.authService.loggedIn()) {

            if (this.quantity > 0) {
                try {
                    let subTotal = itemPrice * this.quantity;
                    let list = JSON.parse(localStorage.getItem('itemList'));
                    if (list.length > 0) {
                        let find = list.find(name => name.itemId === itemId);
                        if (find === undefined) {
                            let item = {
                                itemId: itemId,
                                itemName: itemName,
                                itemImage: itemImage,
                                itemPrice: itemPrice,
                                itemQty: this.quantity,
                                subTotal: subTotal
                            };
                            list.push(item);
                        } else {
                            find.itemQty += this.quantity;
                            find.subTotal += subTotal;
                        }
                    } else {
                        let item = {
                            itemId: itemId,
                            itemName: itemName,
                            itemImage: itemImage,
                            itemPrice: itemPrice,
                            itemQty: this.quantity,
                            subTotal: subTotal
                        };
                        list.push(item);
                    }

                    localStorage.setItem('itemList', JSON.stringify(list));
                    this.alertService.success(itemName + ' added to cart', this.options);
                    this.removebackdrop();
                } catch (e) {
                    this.alertService.warn('Something went wrong', this.options);
                }
            } else {
                this.alertService.warn('Quantity must be greater than 0', this.options);
            }
        } else {
            this.ntService.notify('error', 'Please login to the system to continue this process.');
        }
    }

    _continueToShopping() {
        this.removebackdrop();
        this.router.navigate(['/categories']);
    }

    removebackdrop() {
        this.closebutton.nativeElement.click();
    }
}
