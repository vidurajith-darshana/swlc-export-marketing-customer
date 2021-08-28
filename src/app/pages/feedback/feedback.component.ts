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

    constructor(private productService: ProductService,
                protected alertService: AlertService) {
    }

    private productList: Product[];

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    keyword = 'name';

    public feedbackUiModel = {
        productCode: null,
        cusName: null,
        email: null,
        description: null
    }

    private product: any;

    ngOnInit(): void {
        this.getAllProducts()
    }

    private getAllProducts() {
        this.productService._getAllProducts(0).subscribe((data) => {
            if (data['success']) {
                this.productList = data['body'].content;
            }
        }, error => {

        })
    }


    selectEvent(item) {
        this.feedbackUiModel.productCode = item.code
    }

    onChangeSearch(val: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e) {
        // do something when input is focused
    }

    sendFeedback() {
        if ((this.feedbackUiModel.productCode == '' || this.feedbackUiModel.productCode) &&
            (this.feedbackUiModel.cusName == '' || this.feedbackUiModel.cusName) &&
            (this.feedbackUiModel.email == '' || this.feedbackUiModel.email) &&
            (this.feedbackUiModel.description == '' || this.feedbackUiModel.description)) {

            this.alertService.warn('Check whether all fields are filled', this.options)
            return
        }

        this.productService.sendFeedback(this.feedbackUiModel).subscribe((data) => {
            if (data['success']) {
                this.productList = data['body'].content;
            }
        }, error => {

        })

    }
}
