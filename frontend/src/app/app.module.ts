import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { TopnavComponent } from './dashboard/topnav/topnav.component';
import { ChartboartComponent } from './dashboard/chartboart/chartboart.component';
import { UsersComponent } from './superadmin/users/users.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintsComponent } from './superadmin/complaints/complaints.component';
import { LeadsComponent } from './superadmin/leads/leads.component';
import { DataTablesModule } from 'angular-datatables';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthserviceService } from './shared/authservice.service';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { EditprofileComponent } from './superadmin/editprofile/editprofile.component';
import { StockComponent } from './superadmin/stock/stock.component';
import { InvoiceComponent } from './superadmin/invoice/invoice.component';
import { StockallotmentComponent } from './superadmin/stockallotment/stockallotment.component';
import { SelectteamComponent } from './superadmin/selectteam/selectteam.component';
import { AssignedleadsComponent } from './superadmin/assignedleads/assignedleads.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserprofileComponent } from './superadmin/userprofile/userprofile.component';
import { PaymentComponent } from './superadmin/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    TopnavComponent,
    ChartboartComponent,
     UsersComponent,
     LeadsComponent,
     ComplaintsComponent,
     EditprofileComponent,
     StockComponent,
     InvoiceComponent,
     StockallotmentComponent,
     SelectteamComponent,
     AssignedleadsComponent,
     UserprofileComponent,
     PaymentComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true},AuthGuard,AuthserviceService,RoleGuard
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

