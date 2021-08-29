import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {constants} from '../../../constants/constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private httpClient : HttpClient) { }

  public saveOrder(userId,total,message,status){
    let orderItemList = JSON.parse(localStorage.getItem('itemList'));
    let orderDetails = Array();
    for (let i in orderItemList){
      let orderDetail = {
        id : 0,
        qty : orderItemList[i].itemQty,
        price : orderItemList[i].itemPrice,
        subTotal : orderItemList[i].subTotal,
        fkProductId : orderItemList[i].itemId
      }

      orderDetails.push(orderDetail);
    }

    let saveObject = {
      id : 0,
      fkUserId : userId,
      total : total,
      message : message,
      status : status,
      orderDetails : orderDetails
    }

    let details = JSON.parse(localStorage.getItem('token'));

    let token = details['access_token'];

    const headers =
        new HttpHeaders({
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        });

    let url = `${constants.base_url+'api/order/save'}`;
    return this.httpClient.post(url,saveObject,{headers: headers});
  }


  public getAllOrders(customerId:string):Observable<any>{

    let details = JSON.parse(localStorage.getItem('token'));

    let token = details['access_token'];

    const headers =
        new HttpHeaders({
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        });

    return this.httpClient.get<any>(constants.base_url+"api/order/customer/"+customerId,{headers: headers});
  }
}
