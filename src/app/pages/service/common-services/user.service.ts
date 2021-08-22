import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constants} from '../../../constants/constants';

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
}
