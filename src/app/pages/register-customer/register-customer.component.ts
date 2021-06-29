import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/common-services/user.service';
import {User} from '../model/user';
import {AlertService} from '../_alert';
import {isSuccess} from '@angular/http/src/http_utils';

@Component({
    selector: 'app-register-customer',
    templateUrl: './register-customer.component.html',
    styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

    private customerDetails: User = new User();
    private options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        private userService: UserService,
        protected alertService: AlertService
    ) {
    }

    ngOnInit(): void {
    }

    private _createCustomer() {
        this.customerDetails.role = 'ROLE_CUSTOMER';
        this.userService.createUser(this.customerDetails).subscribe((res) => {
                console.log(res);
                this.alertService.success('Your Registration is success', this.options);
            },
            error => {
                this.alertService.warn('Somthing went wrong Please check again', this.options);
            });
    }

}
