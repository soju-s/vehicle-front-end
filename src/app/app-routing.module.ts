import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleLoginComponent } from './vehicle-login/vehicle-login.component';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BookServiceComponent } from './book-service/book-service.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { ServiceStatusComponent } from './service-status/service-status.component';
import { VehiclePaymentComponent } from './vehicle-payment/vehicle-payment.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
 
  {
    path:'',component:VehicleLoginComponent
  },
  {
    path:'register',component:VehicleRegisterComponent
  },
  {
    path:'home',component:VehicleHomeComponent
  },
  {
    path:'edit-profile',component:EditProfileComponent
  },
  {
    path:'service-history',component:ServiceHistoryComponent
  },
  {
    path:'service-status',component:ServiceStatusComponent
  },
  {
    path:'service-payment',component:VehiclePaymentComponent
  },
  {
    path:'admin-user',component:AdminUserComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  }
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
