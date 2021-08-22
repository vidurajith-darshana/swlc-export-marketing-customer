import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient : HttpClient) { }

  public loggedIn(){
    return !!localStorage.getItem('token');
  }
}
