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

        this.httpClient.post(url, params.toString(), {headers: headers}).subscribe((data) => {
                this.saveToken(data);
                this._getUserDetails(userName);
            }
        ,
            err => this.alertService.warn('Invalid Credentials', this.options));


    }

    public saveToken(data) {
        // window.sessionStorage.setItem('token', );
        localStorage.setItem('token', JSON.stringify(data));
        let itemList = new Array();
        localStorage.setItem("itemList",JSON.stringify(itemList));
    }

    public checkCredentials() {
        return localStorage.getItem('token');
    }

    public logout() {
        localStorage.removeItem('itemList');
        localStorage.removeItem('token');
        window.location.reload();
    }

    public _getUserDetails(customerEmail){
        let url = `${this.APP_URL + 'api/v1/user/getDetails/'+customerEmail}`;
        this.httpClient.get(url).subscribe((data:[]) => {
            console.log(data['body'].id);
            localStorage.setItem('loggedUserId',data['body'].id);
        },error => {

        });
    }

}
