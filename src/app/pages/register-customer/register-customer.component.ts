import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/common-services/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

  private customerDetails : User = new User();

  constructor(
      private userService : UserService
  ) { }

  ngOnInit(): void {
  }

  private _createCustomer(){
    this.customerDetails.role = "ROLE_CUSTOMER";
    this.userService.createUser(this.customerDetails).subscribe((res) => {
      console.log(res);
    });
  }

}
