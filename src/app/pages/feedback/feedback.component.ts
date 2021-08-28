import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/customer-web-services/product.service";
import {Product} from "../model/product";
import {AlertService} from "../_alert";


@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

    constructor(protected alertService: AlertService,private productService: ProductService) {
    }

    private productList: Product[];

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    keyword = 'name';

    public feedbackUiModel = {
        productCode: null,
        productName:null,
        customerName: null,
        email: null,
        description: null
    }

    private product: any;

    ngOnInit(): void {
        this.getAllProducts()
    }

    private getAllProducts() {
        this.productService.getAllProducts().subscribe((data) => {
            if (data['success']) {
                this.productList = data['body'];
            }
        }, error => {

        })
    }


    selectEvent(item) {
        this.feedbackUiModel.productName = item.name
        this.feedbackUiModel.productCode = item.code
    }

    onChangeSearch(val: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e) {
        // do something when input is focused
    }

    requestProductDetails() {
        if ((this.feedbackUiModel.productCode == '' || this.feedbackUiModel.productCode == null) ||
            (this.feedbackUiModel.customerName == '' || this.feedbackUiModel.customerName == null) ||
            (this.feedbackUiModel.email == '' || this.feedbackUiModel.email == null) ||
            (this.feedbackUiModel.description == '' || this.feedbackUiModel.description == null)) {

            this.alertService.warn('Check whether all fields are filled', this.options)

        } else {
            this.productService.sendFeedback(this.feedbackUiModel).subscribe((data) => {
                if (data['success']) {
                    this.productList = data['body'].content;
                }
            }, error => {
                console.log(error.message)
                this.alertService.warn(error.message, this.options)
            })
        }

    }
}
