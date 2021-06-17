import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'categories',       component:CategoriesComponent},
    { path: 'products',         component:ProductsComponent },
    {path: 'cart',              component:CartComponent},
    {path: 'checkout',         component:CheckoutComponent}
];
