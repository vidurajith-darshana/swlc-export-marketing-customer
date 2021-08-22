import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthenticateService} from "../service/common-services/authenticate.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authenticateService : AuthenticateService,
                private router : Router) {
    }

    canActivate(): boolean {
        if (this.authenticateService.loggedIn()){
            return true;
        }else{
            this.router.navigate(['/customer_Login'],{replaceUrl : true});
            return false;
        }
    }
}
