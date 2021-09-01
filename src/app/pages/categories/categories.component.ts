import {Component, OnInit, VERSION} from '@angular/core';
import {Category} from '../model/category';
import {CategoryService} from '../service/customer-web-services/category.service';
import {PromotionService} from '../service/customer-web-services/promotion.service';
import {ProductService} from "../service/customer-web-services/product.service";
import {Product} from "../model/product";
import {AlertService} from "../_alert";
import {Router} from "@angular/router";
import {Promotion} from '../model/promotion';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categoryName = 'Angular ' + VERSION.major;

    private categoryList: Category[];
    private promotionList: Promotion[];
    private promotionListf: Promotion[];
    private promotionListfid = 0;
    private promotionListfim ='';
    private promotionListfde ='';
    private promotionLista: Promotion[];

    private productList : Product[];

    private product: Product[];
    private quantity : number = 0;

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    constructor(
        protected alertService: AlertService,
        private categoryService: CategoryService,
        private promotionService: PromotionService,
        private productService : ProductService,
        private router : Router
        ) {
    };

    ngOnInit(): void {
        this.getAllCategoryList();
        this.getAllPromotionList();
        this.getProductList(0);
    }

    private getAllPromotionList() {
        console.log('ddddddddddddd');

        this.promotionService.getAllPromotions().subscribe(
            (data: Object[]) => {
                console.log(data);
                console.log('sssssssssssssssssss');

                // this.promotionLista = data['body'].content[0];
                this.promotionListf = data['body'].content[0];
                if (data['body'].content.length > 0) {

                    if (data['body'].content[0].id) {
                        this.promotionListfid = data['body'].content[0].id;
                    }
                    if (data['body'].content[0].image) {
                        this.promotionListfim = data['body'].content[0].image;
                    }
                    if (data['body'].content[0].description) {
                        this.promotionListfde = data['body'].content[0].description;
                    }
                }
                data['body'].content.shift()
                this.promotionList = data['body'].content;

            },
            error => {
                console.log('aaaaaaaaaaaaaaaaaaaaa');
            });
    }
    private getAllCategoryList() {
        this.categoryService.getAllCategory().subscribe(
            (data: Object[]) => {
                this.categoryList = data['body'].content;
            },
            error => {
            });
    }

    private getProductList(pageNo){
        this.productService._getAllProducts(pageNo).subscribe((data)=>{
            if (data['success']){
                this.productList = data['body'].content;
            }
        },error => {

        })
    }

    private _addToCartByHome(itemId,itemName,itemImage,itemPrice){
    if (this.quantity > 0){
        try {
            let subTotal = itemPrice * this.quantity;
            let list = JSON.parse(localStorage.getItem('itemList'));
            if (list.length > 0){
                let find = list.find(name => name.itemId === itemId);
                console.log(find)
                if (find === undefined){
                    let item = {
                        itemId: itemId,
                        itemName: itemName,
                        itemImage: itemImage,
                        itemPrice: itemPrice,
                        itemQty: this.quantity,
                        subTotal: subTotal
                    };
                    list.push(item);
                }else{
                    find.itemQty += this.quantity;
                    find.subTotal += subTotal;
                }
            }else{
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
            this.alertService.success(itemName + 'added to cart', this.options);
        } catch (e) {
            this.alertService.warn('Something went wrong', this.options);
        }
    }else{
        this.alertService.warn('Quantity must be greater than 0', this.options);
        }
    }

}
