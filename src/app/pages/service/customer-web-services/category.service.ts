import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private BASE_URL = 'http://54.251.224.107:8012/';

    constructor(private httpClient: HttpClient) {
    }

    public getAllCategory() {
        console.log('aaaaaaaa')
        let url = `${this.BASE_URL + 'api/v1/user/category/all?page=0&size=10'}`;
        return this.httpClient.get(url);
    }
}
