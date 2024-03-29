import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChartboartComponent } from './dashboard/chartboart/chartboart.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UsersComponent } from './superadmin/users/users.component';
import { LeadsComponent } from './superadmin/leads/leads.component';
import { ComplaintsComponent } from './superadmin/complaints/complaints.component';
import { UserprofileComponent } from './superadmin/userprofile/userprofile.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { EditprofileComponent } from './superadmin/editprofile/editprofile.component';
import { StockComponent } from './superadmin/stock/stock.component';
import { InvoiceComponent } from './superadmin/invoice/invoice.component';
import { StockallotmentComponent } from './superadmin/stockallotment/stockallotment.component';
import { AssignedleadsComponent } from './superadmin/assignedleads/assignedleads.component';
import { SelectteamComponent } from './superadmin/selectteam/selectteam.component';
import { PaymentComponent } from './superadmin/payment/payment.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:"login"
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    component:HomeComponent,
    path:"dashboard",  canActivate:[AuthGuard],
    children: [
      { path: '', component: UserprofileComponent },
      { path: 'chart', canActivate:[RoleGuard], component: ChartboartComponent },
      { path: 'users', canActivate:[RoleGuard], component: UsersComponent, },
      { path: 'leads', component: LeadsComponent },
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'editprofile', component:EditprofileComponent},

      { path: 'stock', component:StockComponent},
      { path: 'invoice', component:InvoiceComponent},
      { path: 'stockallotment', component:StockallotmentComponent},
      { path:'assignedlead',component:AssignedleadsComponent},
      { path: 'stock', component:StockComponent},
      { path: 'selectteam', component:SelectteamComponent},
      { path: 'payment', component:PaymentComponent}
    ]
  }
  // {
  //   component:HomeComponent,
  //   path:"dashboard", 
  //   children: [
  //     { path: 'chart',  component: ChartboartComponent },
  //     { path: 'users', component: UsersComponent, },
  //     { path: 'leads', component: LeadsComponent },
  //     { path: 'complaints', component: ComplaintsComponent },
  //     { path: '', component: UserprofileComponent },
  //     { path: 'editprofile', component:EditprofileComponent},
  //     { path: 'stock', component:StockComponent}
      
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// canActivate:[RoleGuard]