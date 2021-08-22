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
}
