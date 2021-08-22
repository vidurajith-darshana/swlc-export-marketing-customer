import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../pages/service/common-services/authenticate.service';
import {constants} from '../../constants/constants';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public focus;
    public listTitles: any[];
    public location: Location;

    public userFullName:string;

    constructor(location: Location, private element: ElementRef, private router: Router, public authenticationService:AuthenticateService) {
        this.location = location;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);

        this.userFullName = localStorage.getItem(constants.user_full_name_key);
    }

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    onLogOut(){

        this.router.navigate(['/customer_Login'])

        localStorage.clear();
        //
    }


}
