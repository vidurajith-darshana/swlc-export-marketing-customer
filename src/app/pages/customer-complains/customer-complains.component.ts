import { Component, OnInit } from '@angular/core';
import {ComplainService} from "../service/customer-web-services/complain.service";
import {CustomerLoginService} from "../service/customer-web-services/customer-login.service";
import {Router} from "@angular/router";
import {AlertService} from "../_alert";
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-customer-complains',
  templateUrl: './customer-complains.component.html',
  styleUrls: ['./customer-complains.component.scss']
})
export class CustomerComplainsComponent implements OnInit {

  complainType : string = '';
  complainComment : string = '';
  customerType : boolean;
  userId : any = null;

  private options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(
      private customerComplainService : ComplainService,
      private userService : CustomerLoginService,
      private router : Router,
      protected alertService: AlertService,
      private ntService:NotifierService
  ) { }

  ngOnInit(): void {
  }

  createComplain(){

    if (this.complainType !== ''){
      if (this.complainComment !== ''){
        let data = {
          customerReviewType : this.complainType,
          customerReviewComment : this.complainComment,
          user : this.userId
        }

        this.customerComplainService.createComplain(data).subscribe((data)=>{
          if (data['success']){
            this.ntService.notify('success','Your review has been successfully created!');
            this.clearText();
          }else {
            this.ntService.notify('error','Complain create failed');
          }
        },error => {
          this.ntService.notify('error','Complain create failed');
        })
      }else {
        this.ntService.notify('error','Complain create failed');
      }
    }else {
      this.ntService.notify('error','Complain create failed');
    }

  }

  onItemChange(value){
    let credentials = this.userService.checkCredentials();

    if (credentials !== null){

      this.userId = localStorage.getItem("loggedUserId");

    }else{
      this.router.navigate(['/customer_Login'])
    }
  }

  clearText(){
    this.complainComment = '';
    this.userId = null;
  }

}
