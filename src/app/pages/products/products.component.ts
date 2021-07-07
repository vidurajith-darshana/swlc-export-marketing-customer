/* tslint:disable:max-line-length */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../model/product';
import {ProductService} from '../service/customer-web-services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    orderby: string;

    private product: Product[];
    private quantity : number = 0;

    sampleArray : [];

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
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

    private _addToCart(itemId,itemName,itemImage,itemPrice){
        let subTotal = itemPrice * this.quantity;
        let list = JSON.parse(localStorage.getItem('itemList'));
        localStorage.removeItem('itemList');
        let item = {
            itemId : itemId,
            itemName : itemName,
            itemImage : itemImage,
            itemPrice : itemPrice,
            itemQty : this.quantity,
            subTotal : subTotal
        };
        list.push(item);
        localStorage.setItem('itemList',JSON.stringify(list));
    }
}
