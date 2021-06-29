import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private APP_URL = 'http://103.125.216.56:8012/';

    constructor(private httpClient: HttpClient) {
    }

    public createUser(user) {
        let url = `${this.APP_URL + 'api/v1/user/customer/create'}`;
        return this.httpClient.post(url, user);
    }

    public _forgetPassword(userEmail) {
        let url = `${this.APP_URL + 'api/v1/user/customer/forget-password/' + userEmail}`;
        return this.httpClient.post(url, '');
    }

    public _resetPassword(userEmail, verifyCode, password) {

        let data = {
            email: userEmail,
            verifyCode: verifyCode,
            password: password
        };

        let url = `${this.APP_URL + 'api/v1/user/customer/reset-password'}`;
        return this.httpClient.post(url, data);
    }
}
