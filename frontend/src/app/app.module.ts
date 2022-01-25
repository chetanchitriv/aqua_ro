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
import { UserprofileComponent } from './superadmin/userprofile/userprofile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthserviceService } from './shared/authservice.service';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { EditprofileComponent } from './superadmin/editprofile/editprofile.component';



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
     UserprofileComponent,
     EditprofileComponent,
     

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
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
