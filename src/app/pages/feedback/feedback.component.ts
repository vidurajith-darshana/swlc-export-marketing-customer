import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/customer-web-services/product.service";
import {Product} from "../model/product";
import {AlertService} from "../_alert";
import {NotifierService} from "angular-notifier";



@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

    constructor(protected alertService: AlertService,private productService: ProductService,private notify:NotifierService) {
    }

    private productList: Product[];

    private options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    clicked: any
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

            this.notify.notify('error', 'Check whether all fields are filled');

        } else {
            this.productService.sendFeedback(this.feedbackUiModel).subscribe((data) => {
                if (data['success']) {
                    this.notify.notify('success', 'Your Request was successfully added');
                    this.clearFields()
                }
            }, error => {
                console.log(error.message)
                this.alertService.warn("Something went wrong", this.options)
            })
        }

    }

    private clearFields() {
        this.feedbackUiModel.productName = null
        this.feedbackUiModel.customerName = null
        this.feedbackUiModel.email = null
        this.feedbackUiModel.description = null
    }
}
