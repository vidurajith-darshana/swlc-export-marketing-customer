import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private APP_URL = 'http://18.141.138.171:8012/';

    constructor(private httpClient: HttpClient) {
    }

    public _getProductList(categoryId, pageNo) {
        let url = `${this.APP_URL + 'api/v1/user/product/all/category?category=' + categoryId + '&page=' + pageNo + '&size=5'}`;
        return this.httpClient.get(url);
    }
}
