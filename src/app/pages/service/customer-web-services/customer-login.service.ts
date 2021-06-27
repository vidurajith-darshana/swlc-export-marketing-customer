import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginService {

  private APP_URL = 'http://103.125.216.56:8012/'

  constructor(private httpClient : HttpClient) { }

  public customerLogin(userName,userPassword){
    let params = new URLSearchParams();
    params.append('username',userName);
    params.append('password', userPassword);
    params.append('grant_type', "password");
    let headers =
        new HttpHeaders({
          "Authorization": "Basic dXNlcjo=",
          "Content-Type": "application/x-www-form-urlencoded"
        });
    let url = `${this.APP_URL+'api/v1/authorize'}`
    this.httpClient.post(url,params.toString(), { headers: headers }).subscribe(data => console.log(data),
        err => alert('Invalid Credentials'));
  }
}
