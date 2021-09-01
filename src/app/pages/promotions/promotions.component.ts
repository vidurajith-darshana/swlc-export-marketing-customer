import {Component, OnInit} from '@angular/core';
import {OrderService} from '../service/customer-web-services/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../service/common-services/user.service';

@Component({
    selector: 'app-tables',
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

    promotions: Array<any> = [];
    comments: Array<any> = [];

    config: any;

    constructor(private userService: UserService, private modalService: NgbModal) {

        this.config = {
            itemsPerPage: 10,
            currentPage: 0,
            totalItems: 0
        };

    }

    ngOnInit() {
        this.getAllOrders(0);
    }


    getAllOrders(pageNo) {

        this.userService.getAllPromotions(pageNo, this.config.itemsPerPage).subscribe(
            res => {
                if (res['success']) {
                    this.promotions = res['body']['content'];
                } else {
                    alert('Something went wrong. Please try again!');
                }
            }, error => {
                alert('Something went wrong. Please try again!');
            }
        );
    }

    open(content, comments) {
        this.comments = comments;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    onClickLike(promotion) {

        promotion['isUserLiked'] = promotion['isUserLiked'] === 0 ? 1 : 0;

        let likeStatus = '';
        likeStatus = promotion['isUserLiked'] === 1 ? 'LIKE' : 'REMOVE';

        this.userService.addPromotionLike(promotion['id'], likeStatus).subscribe(
            res => {
                if (res['success']) {
                    this.getAllOrders(this.config.currentPage - 1);
                }
            }
        );
    }

    pageChange(event) {
        this.config.currentPage = event;
        this.getAllOrders(event - 1);
    }


}
