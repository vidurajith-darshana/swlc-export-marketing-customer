import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private BASE_URL = 'http://18.141.138.171:8012/';

    constructor(private httpClient: HttpClient) {
    }

    public getAllCategory() {
        let url = `${this.BASE_URL + 'api/v1/user/category/all?page=0&size=10'}`;
        return this.httpClient.get(url);
    }
}
