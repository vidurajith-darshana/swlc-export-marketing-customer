import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../_alert';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {constants} from '../../../constants/constants';
import {SharedService} from '../common-services/shared-service';

@Injectable({
    providedIn: 'root'
})
export class CustomerLoginService {

    private options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        protected alertService: AlertService,
        private httpClient: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private sharedService:SharedService
    ) {
    }

    public customerLogin(userName, userPassword) {

        const params = new URLSearchParams();
        params.append('username', userName);
        params.append('password', userPassword);
        params.append('grant_type', 'password');

        const headers =
            new HttpHeaders({
                'Authorization': 'Basic dXNlcjo=',
                'Content-Type': 'application/x-www-form-urlencoded'
            });

        const url = `${constants.base_url + 'api/v1/authorize'}`;

        this.httpClient.post(url,params.toString(),{headers}).subscribe((data)=>{
            this.saveToken(data);
            this._getUserDetails(userName);
            this.alertService.success('Login success', this.options);
            this.router.navigate(['/categories']);
        },error => {
            this.alertService.warn('Invalid Credentials', this.options)    });
    }

    public saveToken(data) {
        // window.sessionStorage.setItem('token', );
        localStorage.setItem('token', JSON.stringify(data));
        const itemList = new Array();
        localStorage.setItem('itemList', JSON.stringify(itemList));
    }

    public checkCredentials() {
        return localStorage.getItem('token');
    }

    public logout() {
        localStorage.removeItem('itemList');
        localStorage.removeItem('token');
        window.location.reload();
    }

    public _getUserDetails(customerEmail) {
        const url = `${constants.base_url + 'api/v1/user/getDetails/' + customerEmail}`;
        this.httpClient.get(url).subscribe((data: []) => {
            localStorage.setItem('loggedUserId', data['body'].id);

            let fullName= "";

            if (data['body']['firstName'] != null){
                fullName = data['body']['firstName'];
            }

            if (data['body']['lastName'] != null){
                fullName += " "+data['body']['lastName'];
            }

            localStorage.setItem(constants.user_full_name_key, fullName);

            this.sharedService.userNameEvent.emit(fullName);

        }, error => {

        });
    }

}
