import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticateService} from '../pages/service/common-services/authenticate.service';



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticateService, private router: Router) {
    }

    canActivate(): boolean {
        if (!this.authService.loggedIn()) {
            this.router.navigate(['/admin_Login'], {replaceUrl: true});
            return false;
        } else {
            return true;
        }
    }
}
