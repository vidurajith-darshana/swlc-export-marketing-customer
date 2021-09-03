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
import {AdminLoginComponent} from '../../pages/admin-login/admin-login.component';
import {AdminRegisterComponent} from '../../pages/admin-register/admin-register.component';
import {ResetPasswordComponent} from "../../pages/reset-password/reset-password.component";

export const AdminLayoutRoutes: Routes = [

    {path: 'customer_Login', component: CustomerLoginComponent},
    {path: 'reg-Customer', component: RegisterCustomerComponent},
    {path: 'admin_Login', component: AdminLoginComponent},
    {path: 'reg_Admin', component: AdminRegisterComponent},

    {path: 'dashboard', canActivate:[AuthGuard], component: DashboardComponent},
    {path: 'user-profile', canActivate:[AuthGuard], component: UserProfileComponent},
    {path: 'tables', canActivate:[AuthGuard], component: TablesComponent},
    {path: 'icons', canActivate:[AuthGuard], component: IconsComponent},
    {path: 'maps', canActivate:[AuthGuard], component: MapsComponent},
    {path: 'categories', canActivate:[AuthGuard], component: CategoriesComponent},
    {path: 'products', canActivate:[AuthGuard], component: ProductsComponent},
    {path: 'cart', canActivate:[AuthGuard], component: CartComponent},
    {path: 'checkout', canActivate:[AuthGuard], component: CheckoutComponent},
    {path: 'feedback', canActivate:[AuthGuard], component: FeedbackComponent},
    {path: 'forget_Password',  component:ForgetpasswordComponent},
    {path: 'reset_password',  component:ResetPasswordComponent},
    {path: 'my-orders', canActivate:[AuthGuard], component:MyOrdersComponent},
    {path: 'customer-complains', canActivate:[AuthGuard], component:CustomerComplainsComponent},
];
