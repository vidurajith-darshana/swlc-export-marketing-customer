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
import {CustomerLoginComponent} from 'src/app/pages/customer-login/customer-login.component';
import {RegisterCustomerComponent} from 'src/app/pages/register-customer/register-customer.component';
import {AdminLoginComponent} from 'src/app/pages/admin-login/admin-login.component';
import {AdminRegisterComponent} from 'src/app/pages/admin-register/admin-register.component';
import {FeedbackComponent} from 'src/app/pages/feedback/feedback.component';
import { CustomerLoginService } from 'src/app/pages/service/customer-web-services/customer-login.service';
import { ReviewsComponent } from 'src/app/pages/reviews/reviews.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'tables', component: TablesComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'customer_Login', component: CustomerLoginComponent},
    {path: 'reg-Customer', component: RegisterCustomerComponent},
    {path: 'admin_Login', component: AdminLoginComponent},
    {path: 'reg_Admin', component: AdminRegisterComponent},
    {path: 'reviews', component: ReviewsComponent}
];
