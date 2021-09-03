import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {constants} from '../../../constants/constants';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    public createUser(user) {
        let url = `${constants.base_url + 'api/v1/user/customer/create'}`;
        return this.httpClient.post(url, user);
    }

    public _forgetPassword(userEmail) {
        let url = `${constants.base_url + 'api/v1/user/customer/forget-password/' + userEmail}`;
        return this.httpClient.post(url, '');
    }

    public _resetPassword(userEmail, verifyCode, password) {

        let data = {
            email: userEmail,
            verifyCode: verifyCode,
            password: password
        };

        let url = `${constants.base_url + 'api/v1/user/customer/reset-password'}`;
        return this.httpClient.post(url, data);
    }

    public getAllPromotions(page:number,size:number,searchKeyword:string):Observable<any>{
        let token = localStorage.getItem('access_token');
        const headers =
            new HttpHeaders({
                'Authorization': 'Bearer ' + token
            });
        return this.httpClient.get(constants.base_url +'api/v1/user/promotion/all?page='+page+'&size='+size+'&search='+searchKeyword+'',{headers:headers});
    }

    public addPromotionLike(promotionId : number, like : string):Observable<any>{

        let token = localStorage.getItem('access_token');
        const headers =
            new HttpHeaders({
                'Authorization': 'Bearer ' + token
            });

        return this.httpClient.patch(constants.base_url + 'api/v1/user/promotion/like?promotion='+promotionId+'&status='+like+'','',{headers:headers});
    }

    public addPromotionComment(promotionId : number, comment : string):Observable<any>{

        let token = localStorage.getItem('access_token');
        const headers =
            new HttpHeaders({
                'Authorization': 'Bearer ' + token
            });

        return this.httpClient.patch(constants.base_url + 'api/v1/user/promotion/comment?promotion='+promotionId+'&comment='+comment+'','',{headers:headers});
    }

}
