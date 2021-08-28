import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constants} from '../../../constants/constants';

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

    public _getAllProducts(pageNo){
        let url = `${constants.base_url + 'api/v1/user/product/all?page='+pageNo+'&size=10'}`;
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
}
