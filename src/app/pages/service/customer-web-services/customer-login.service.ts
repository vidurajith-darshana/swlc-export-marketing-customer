import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../_alert';

@Injectable({
    providedIn: 'root'
})
export class CustomerLoginService {

    private APP_URL = 'http://103.125.216.56:8012/';
    private options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        protected alertService: AlertService,
        private httpClient: HttpClient
    ) {
    }

    public customerLogin(userName, userPassword) {

        let params = new URLSearchParams();
        params.append('username', userName);
        params.append('password', userPassword);
        params.append('grant_type', 'password');

        let headers =
            new HttpHeaders({
                'Authorization': 'Basic dXNlcjo=',
                'Content-Type': 'application/x-www-form-urlencoded'
            });

        let url = `${this.APP_URL + 'api/v1/authorize'}`;

        this.httpClient.post(url, params.toString(), {headers: headers}).subscribe(data => this.saveToken(data),
            err => this.alertService.warn('Invalid Credentials', this.options)
        );
    }

    public saveToken(data) {
        window.sessionStorage.setItem('token', JSON.stringify(data));
        localStorage.setItem('', '');
        console.log(window.sessionStorage.getItem('token'));
    }

    public checkCredentials() {
        return window.sessionStorage.getItem('token');
    }

    public logout() {
        window.sessionStorage.removeItem('token');
        window.location.reload();
    }

}
