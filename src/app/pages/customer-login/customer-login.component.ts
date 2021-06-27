import { Component, OnInit } from '@angular/core';
import {CustomerLoginService} from "../service/customer-web-services/customer-login.service";

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  private userName : string;
  private userPassword : string;

  constructor(private customerLoginService : CustomerLoginService) { }

  ngOnInit(): void {
  }

  private _customerLogin(){
    if (this.userPassword !== '' && this.userName !== ''){
      this.customerLoginService.customerLogin(this.userName,this.userPassword);
    }
  }

}
