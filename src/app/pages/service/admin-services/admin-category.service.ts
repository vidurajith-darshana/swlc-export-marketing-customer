import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {constants} from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {



  constructor(private httpClient : HttpClient) { }

  public _getCategoryList(pageNo){
    let url = `${constants.base_url + 'api/v1/admin/category/all?page='+pageNo+'&size=10'}`;
    return this.httpClient.get(url);
  }

}
