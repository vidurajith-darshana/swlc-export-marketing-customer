import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constants} from '../../../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {


    constructor(private httpClient: HttpClient) {
    }

    public getAllPromotions() {
        let url = `${constants.base_url + 'api/v1/user/promotion/all?page=0&size=50'}`;
        console.log(url);
        return this.httpClient.get(url);
    }
}
