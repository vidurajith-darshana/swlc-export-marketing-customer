import {Component, OnInit, VERSION} from '@angular/core';
import {Category} from '../model/category';
import {CategoryService} from '../service/customer-web-services/category.service';
import {ProductService} from '../service/customer-web-services/product.service';
import {Product} from '../model/product';
import {AlertService} from '../_alert';
import {Router} from '@angular/router';
import {AuthenticateService} from '../service/common-services/authenticate.service';
import {NotifierService} from 'angular-notifier';
import {PromotionService} from '../service/customer-web-services/promotion.service';
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
    private promotionLista: Promotion[];

    private productList: Product[];

    private product: Product[];
    private quantity: number = 0;

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    tempLike: boolean = false;

    config: any;

    constructor(
        protected alertService: AlertService,
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private authService: AuthenticateService,
        private ntService: NotifierService,
        private promotionService: PromotionService
    ) {


        this.config = {
            itemsPerPage: 8,
            currentPage: 0,
            totalItems: 0
        };
    };


    ngOnInit(): void {
        this.getAllCategoryList();
        this.getAllPromotionList();
        this.getProductList(0);
    }

    private getAllPromotionList() {
        this.promotionService.getAllPromotions().subscribe(
            (data: Object[]) => {

                // this.promotionLista = data['body'].content[0];
                this.promotionListf = data['body'].content[0];
                data['body'].content.shift();
                this.promotionList = data['body'].content;
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                console.log(data);
                console.log(this.promotionListf);
                console.log(this.promotionList);
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            },
            error => {
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

    private getProductList(pageNo) {
        this.productService._getAllProducts(pageNo, this.config.itemsPerPage).subscribe((data) => {
            if (data['success']) {
                this.productList = data['body'].content;
                this.config.totalItems = data['body']['totalElements'];
            }else{
                this.ntService.notify('error','Something went wrong. Please try again!');
            }
        }, error => {
            this.ntService.notify('error','Something went wrong. Please try again!');
        });
    }

    private _addToCartByHome(itemId, itemName, itemImage, itemPrice) {

        if (this.authService.loggedIn()) {
            if (this.quantity > 0) {


                try {
                    let subTotal = itemPrice * this.quantity;
                    let list = JSON.parse(localStorage.getItem('itemList'));
                    if (list.length > 0) {
                        let find = list.find(name => name.itemId === itemId);
                        console.log(find);
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
                    this.alertService.success(itemName + 'added to cart', this.options);
                } catch (e) {
                    this.alertService.warn('Something went wrong', this.options);
                }
            } else {
                this.ntService.notify('error', 'Quantity must be greater than 0');

            }
        } else {
            this.ntService.notify('error', 'Please login to the system to continue this process.');
        }
    }


    openCategoryPage(category) {
        this.router.navigate(['/products'], {queryParams: {id: category['id'], name: category['name']}});
    }


    onClickLike(product) {

        if(this.authService.loggedIn()) {

            product['userLiked'] = !product['userLiked'];

            let likeStatus = '';
            likeStatus = product['userLiked'] ? 'LIKE' : 'REMOVE';

            this.productService.addProductLike(product['id'], likeStatus).subscribe(
                res => {
                    if (res['success']) {
                        this.getProductList(this.config.currentPage - 1);
                    }else{
                        this.ntService.notify('error','Something went wrong. Please try again!');
                    }
                },error => {
                    this.ntService.notify('error','Something went wrong. Please try again!');
                }
            );
        }else{
            this.ntService.notify('error', 'Please login to the system to continue this process.');
        }
    }

    pageChange(event) {
        this.config.currentPage = event;
        this.getProductList(event - 1);
    }

    openPromotionsPage(){
        this.router.navigate(['/promotions']);
    }

}
