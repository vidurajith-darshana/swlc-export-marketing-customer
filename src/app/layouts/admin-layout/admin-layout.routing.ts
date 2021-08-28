import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {CategoriesComponent} from 'src/app/pages/categories/categories.component';
import {ProductsComponent} from 'src/app/pages/products/products.component';
import {CartComponent} from 'src/app/pages/cart/cart.component';
import {CheckoutComponent} from 'src/app/pages/checkout/checkout.component';
import {FeedbackComponent} from 'src/app/pages/feedback/feedback.component';
import { ForgetpasswordComponent } from 'src/app/pages/forgetpassword/forgetpassword.component';
import {MyOrdersComponent} from '../../pages/my-orders/my-orders.component';
import {CustomerComplainsComponent} from '../../pages/customer-complains/customer-complains.component';
import {AuthGuard} from '../../guards/auth.guard';
import {CustomerLoginComponent} from '../../pages/customer-login/customer-login.component';
import {RegisterCustomerComponent} from '../../pages/register-customer/register-customer.component';


export const AdminLayoutRoutes: Routes = [

    {path: 'customer_Login', component: CustomerLoginComponent},
    {path: 'reg-Customer', component: RegisterCustomerComponent},
    // {path: 'reg_Admin', component: AdminRegisterComponent},


    {path: 'categories', component: CategoriesComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'cart', canActivate:[AuthGuard], component: CartComponent},
    {path: 'checkout', canActivate:[AuthGuard], component: CheckoutComponent},
    {path: 'feedback', canActivate:[AuthGuard], component: FeedbackComponent},
    {path: 'forget_Password',  component:ForgetpasswordComponent},
    {path: 'my-orders', canActivate:[AuthGuard], component:MyOrdersComponent},
    {path: 'customer-complains', canActivate:[AuthGuard], component:CustomerComplainsComponent}

];
