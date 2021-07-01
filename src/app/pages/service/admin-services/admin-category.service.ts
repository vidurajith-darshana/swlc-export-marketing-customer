import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  private BASE_URL = 'http://103.125.216.56:8012/';

  constructor(private httpClient : HttpClient) { }

  public _getCategoryList(pageNo){
    let url = `${this.BASE_URL + 'api/v1/admin/category/all?page='+pageNo+'&size=10'}`;
    return this.httpClient.get(url);
  }

  public _createCategory(category){

  }
}
