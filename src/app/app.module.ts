import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {ProductsComponent} from './pages/products/products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CartComponent} from './pages/cart/cart.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {CustomerLoginComponent} from './pages/customer-login/customer-login.component';
import {RegisterCustomerComponent} from './pages/register-customer/register-customer.component';
import {AdminLoginComponent} from './pages/admin-login/admin-login.component';
import {AdminRegisterComponent} from './pages/admin-register/admin-register.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AlertModule } from './pages/_alert';
import { MultiAlertsComponent } from './pages/multi-alerts';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { CustomerComplainsComponent } from './pages/customer-complains/customer-complains.component';

// import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        AlertModule,
        NgxPaginationModule,
        AutocompleteLibModule

    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        ProductsComponent,
        CartComponent,
        CheckoutComponent,
        CustomerLoginComponent,
        RegisterCustomerComponent,
        AdminLoginComponent,
        AdminRegisterComponent,
        MultiAlertsComponent,
        FeedbackComponent,
        ReviewsComponent,
        CustomerComplainsComponent,
       
        // ForgetpasswordComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
