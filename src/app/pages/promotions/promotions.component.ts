import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../service/customer-web-services/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../service/common-services/user.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-tables',
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit, AfterViewInit {

    @ViewChild('searchElement', {static: true}) searchElement: ElementRef;

    promotions: Array<any> = [];
    comments: Array<any> = [];
    config: any;
    searchWord: string = '';
    maxChars: number = 250;
    comment: string = '';
    openedPromotion: any;
    addNewModelReference: any;

    constructor(private userService: UserService, private modalService: NgbModal, private ntService: NotifierService) {

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: 0
        };

    }

    ngOnInit() {
        this.getAllPromotions(0);
    }


    getAllPromotions(pageNo) {

        this.userService.getAllPromotions(pageNo, this.config.itemsPerPage, this.searchWord).subscribe(
            res => {
                if (res['success']) {
                    this.promotions = res['body']['content'];
                    this.config.totalItems = res['body']['totalElements'];
                } else {
                    this.ntService.notify('error', 'Something went wrong. Please try again!');
                }
            }, error => {
                this.ntService.notify('error', 'Something went wrong. Please try again!');
            }
        );
    }

    open(content, comments) {
        this.comments = comments;

        console.log(this.comments)
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    onClickLike(promotion) {

        promotion['isUserLiked'] = promotion['isUserLiked'] === 0 ? 1 : 0;

        let likeStatus = '';
        likeStatus = promotion['isUserLiked'] === 1 ? 'LIKE' : 'REMOVE';

        this.userService.addPromotionLike(promotion['id'], likeStatus).subscribe(
            res => {
                if (res['success']) {
                    this.getAllPromotions(this.config.currentPage - 1);
                } else {
                    this.ntService.notify('error', 'Something went wrong. Please try again!');
                }
            }, error => {
                this.ntService.notify('error', 'Something went wrong. Please try again!');
            }
        );
    }

    pageChange(event) {
        this.config.currentPage = event;
        this.getAllPromotions(event - 1);
    }

    ngAfterViewInit(): void {

        fromEvent(this.searchElement.nativeElement, 'keyup').pipe(
            // get value
            map((event: any) => {

                if (event.target.value.length == 0) {
                    this.getAllPromotions(0);
                }
                return event.target.value;
            })

            , filter(res => res.length > 1)

            , debounceTime(1000)

            , distinctUntilChanged()
        ).subscribe((text: string) => {
            this.getAllPromotions(0);
        });

    }

    openAddNewComment(content, promotion) {
        this.openedPromotion = promotion;
        this.addNewModelReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    addNewComment() {

        this.userService.addPromotionComment(this.openedPromotion['id'], this.comment).subscribe(
            res => {
                this.addNewModelReference.close();
                if (res['success']) {
                    this.ntService.notify('success', 'Your comment has been successfully saved. Thank you!');
                } else {
                    this.ntService.notify('error', 'Something went wrong. Please try again!');
                }
            }, error => {
                this.ntService.notify('error', 'Something went wrong. Please try again!');
            }
        );
    }

}
