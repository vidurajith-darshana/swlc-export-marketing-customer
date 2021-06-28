import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APP_URL = 'http://103.125.216.56:8012/';

  constructor(private httpClient : HttpClient) { }

  public _getProductList(){
    let url = `${this.APP_URL+'api/v1/user/product/all?page=0&size=10'}`;
    return this.httpClient.get(url);
  }
}
