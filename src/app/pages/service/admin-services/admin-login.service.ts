import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  private APP_URL = 'http://103.125.216.56:8012/';

  constructor(private httpClient : HttpClient) { }

  public _adminLogin(userName,userPassword){
    const params = new URLSearchParams();
    params.append('username', userName);
    params.append('password', userPassword);
    params.append('grant_type', 'password');

    const headers =
        new HttpHeaders({
          'Authorization': 'Basic dXNlcjo=',
          'Content-Type': 'application/x-www-form-urlencoded'
        });

    const url = `${this.APP_URL + 'api/v1/authorize'}`;

    this.httpClient.post(url, params.toString(), {headers: headers}).subscribe((data) => {
          this.saveToken(data);
          this._getUserDetails(userName);
        }
        ,
        err => {}
    );
  }

  public saveToken(data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  public checkCredentials() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  }

  public _getUserDetails(customerEmail) {
    const url = `${this.APP_URL + 'api/v1/user/getDetails/' + customerEmail}`;
    this.httpClient.get(url).subscribe((data: []) => {
      localStorage.setItem('loggedUserId', data['body'].id);
    }, error => {

    });
  }
}
