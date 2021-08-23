import {Component, OnInit} from '@angular/core';
import {OrderService} from '../service/customer-web-services/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tables',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

    orders: Array<any> = [];
    orderDetails: Array<any> = [];

    constructor(private orderService: OrderService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getAllOrders();
    }


    getAllOrders() {
        this.orderService.getAllUsers().subscribe(
            res => {
                if (res['success']) {
                    this.orders = res['body'];
                } else {
                    alert('Something went wrong. Please try again!');
                }
            }, error => {
                alert('Something went wrong. Please try again!');
            }
        );
    }

    open(content, orderDetails) {
        this.orderDetails = orderDetails;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

}
