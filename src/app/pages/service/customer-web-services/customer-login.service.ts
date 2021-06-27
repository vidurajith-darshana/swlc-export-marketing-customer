import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginService {

  private APP_URL = 'http://103.125.216.56:8012/'

  constructor(private httpClient : HttpClient) { }

  public customerLogin(userName,userPassword){
    let loginDetails = {
      username : userName,
      password : userPassword,
      grant_type : 'password'
    }
    let url = `${this.APP_URL+'api/v1/authorize'}`
    this.httpClient.post(url,loginDetails).subscribe(data => console.log(data),
        err => alert('Invalid Credentials'));
  }
}
