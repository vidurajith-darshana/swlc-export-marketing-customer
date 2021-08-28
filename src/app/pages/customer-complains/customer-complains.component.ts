import { Component, OnInit } from '@angular/core';
import {ComplainService} from "../service/customer-web-services/complain.service";
import {CustomerLoginService} from "../service/customer-web-services/customer-login.service";
import {Router} from "@angular/router";
import {AlertService} from "../_alert";

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
            this.alertService.success('Complain create success',this.options);
            this.clearText();
          }else {
            this.alertService.error('Complain create failed',this.options);
          }
        },error => {
          this.alertService.error("Complain create failed",this.options);
        })
      }else {
        this.alertService.error("Please enter complain",this.options);
      }
    }else {
      this.alertService.error("Please select complain type",this.options);
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
