import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constants} from '../../../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    constructor(private httpClient: HttpClient) {
    }

    public getAllCategory() {
        let url = `${constants.base_url + 'api/v1/user/category/all?page=0&size=10'}`;
        return this.httpClient.get(url);
    }
}
