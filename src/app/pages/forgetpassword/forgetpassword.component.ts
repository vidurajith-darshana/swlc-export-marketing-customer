import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/common-services/user.service";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  senderEmail : string = "vidu996@gmail.com";

  constructor(
      private userService : UserService
  ) { }

  ngOnInit(): void {
  }

  _forgetPassword(){
    console.log(this.senderEmail);
    if (this.senderEmail !== undefined){
      this.userService._forgetPassword(this.senderEmail).subscribe((data)=>{
        console.log(data);
        this.senderEmail = '';
      },error => {
        // alert
      });
    }else {
      // alert
    }
  }

}
