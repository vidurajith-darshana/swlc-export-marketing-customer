import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {constants} from "../../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(
      private httpClient : HttpClient
  ) { }

  public createComplain(complain){
    let details = JSON.parse(localStorage.getItem('token'));

    let token = details['access_token'];

    const headers =
        new HttpHeaders({
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        });

    let url = `${constants.base_url+'api/v1/user/customer/reviews'}`;
    return this.httpClient.post(url,complain,{headers: headers});
  }
}
