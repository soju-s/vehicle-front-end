import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import { VehicleLoginComponent } from './vehicle-login/vehicle-login.component';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { VehicleFooterComponent } from './vehicle-footer/vehicle-footer.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { ServiceStatusComponent } from './service-status/service-status.component';
import { BookServiceComponent } from './book-service/book-service.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { NgxPayPalModule } from 'ngx-paypal';
import { VehiclePaymentComponent } from './vehicle-payment/vehicle-payment.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { PipeFilterPipe } from './pipe/pipe-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    VehicleHomeComponent,
    VehicleLoginComponent,
    VehicleRegisterComponent,
    VehicleFooterComponent,
    EditProfileComponent,
    ServiceHistoryComponent,
    ServiceStatusComponent,
    BookServiceComponent,
    PageNotFoundComponent,
    VehiclePaymentComponent,
    AdminUserComponent,
    PipeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
