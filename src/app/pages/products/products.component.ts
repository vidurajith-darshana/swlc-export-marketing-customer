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

    // product = [
    //     {
    // tslint:disable-next-line:max-line-length
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/1383/e7789469178cc18cf93ad058141fbce6adcdd7a6093ea9f12fda5c52c990b9b2a/A',
    //         productName: 'Cumin Powder',
    //         productCode: 1454665,
    //         productPrice: '$ 9.56'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/897/53fc45239cec1e0768c4061106d09ea646c406671afe82e25904e40bbf1ed731a/A',
    //         productName: 'Cinnamon Powder',
    //         productCode: 145255,
    //         productPrice: '$10.2'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/1323/bb84496c92fd35ece3cefd6bb79bd94cac0b5d4c99eb7e172678efa41165c73ba/A',
    //         productName: 'Chili Powder',
    //         productCode: 1545455,
    //         productPrice: '$ 7.36'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/748/4d34f009994e91308ade1604d6241f906cecc87b4af3d0bf7d8e2d933b9b7f68a/A',
    //         productName: 'Black Papper',
    //         productCode: 4865465,
    //         productPrice: '$8.56'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/4894/f9e5c77ece54c0be8429309c4eec2e7a5bf9b62c1cb73d52309de4eca631dc8ca/A',
    //         productName: 'Garlic Powder',
    //         productCode: 5363566,
    //         productPrice: '$ 12.00'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/856/6242bbd837436aef9c7b78d9bd31a4841a048301b59f40a5fb1743dce85dbe23a/A',
    //         productName: 'Cloves',
    //         productCode: 145545,
    //         productPrice: '$ 4.04'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/3195/d8a381876734b128a11b6ac016b26b84f6d9a12a853876f5cf8d1d0f492d105ba/A',
    //         productName: 'Turmeric Powder',
    //         productCode: 48765464,
    //         productPrice: '$ 6.32'
    //     },
    //     {
    //         productThumbnail: 'https://thumbs.nosto.com/quick/magento-f5b2bba1/8/1383/e7789469178cc18cf93ad058141fbce6adcdd7a6093ea9f12fda5c52c990b9b2a/A',
    //         productName: 'Seasoning Hurbs',
    //         productCode: 845455,
    //         productPrice: '$ 14.56'
    //     }
    // ];


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
}
