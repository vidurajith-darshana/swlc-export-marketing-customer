import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private APP_URL = 'http://18.141.138.171:8012/';

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

    let url = `${this.APP_URL+'api/order/save'}`;
    return this.httpClient.post(url,saveObject,{headers: headers});
  }
}
