import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {constants} from '../../../constants/constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {


  constructor(private httpClient : HttpClient) { }

  public _getProductList(pageNo){
    let url = `${constants.base_url + 'api/v1/admin/product/all?page='+pageNo+'&size=10'}`;
    return this.httpClient.get(url);
  }


}
