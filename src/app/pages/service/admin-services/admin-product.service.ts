import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  private BASE_URL = 'http://103.125.216.56:8012/';

  constructor(private httpClient : HttpClient) { }

  public _getProductList(pageNo){
    let url = `${this.BASE_URL + 'api/v1/admin/product/all?page='+pageNo+'&size=10'}`;
    return this.httpClient.get(url);
  }
}
