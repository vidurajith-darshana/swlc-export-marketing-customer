import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {constants} from '../../../constants/constants';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {


    constructor(private httpClient: HttpClient) {
    }


    public _getProductList(categoryId, pageNo) {
        let url = `${constants.base_url + 'api/v1/user/product/all/category?category=' + categoryId + '&page=' + pageNo + '&size=5'}`;
        return this.httpClient.get(url);
    }

    public _getAllProducts(pageNo,size){
        let url = `${constants.base_url + 'api/v1/user/product/all?page='+pageNo+'&size='+size+''}`;
        return this.httpClient.get(url);
    }

    public getAllProducts(){
        let url = `${constants.base_url + 'api/v1/user/product/active'}`;
        return this.httpClient.get(url);
    }

    sendFeedback(feedbackUiModel: any) {


        let url = `${constants.base_url + 'api/v1/user/product/request-details'}`;
        return this.httpClient.post(url,feedbackUiModel);
    }

    public addProductLike(productId : number, like : string):Observable<any>{

        let token = localStorage.getItem('access_token');
        const headers =
            new HttpHeaders({
                'Authorization': 'Bearer ' + token
            });

        return this.httpClient.patch(constants.base_url + 'api/v1/user/product/like?product='+productId+'&like='+like+'','',{headers:headers});
    }

}
