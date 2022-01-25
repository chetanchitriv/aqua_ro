import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isSuperAdmin :boolean = false
  isAdmin :boolean = false
  isTelecaller :boolean = false
  isTechnician :boolean = false

  constructor() { }

  ngOnInit(): void {
    var Role= localStorage.getItem("role")
    if (Role=='Superadmin'){
      this.isSuperAdmin = true
      this.isAdmin =false
      this.isTelecaller=  false
      this.isTechnician = false
    
    }
    if (Role=='Admin'){
      this.isSuperAdmin = false
      this.isAdmin =true
      this.isTelecaller=  false
      this.isTechnician = false
    }
    if (Role=='Technician'){
      this.isSuperAdmin = false
      this.isAdmin =false
      this.isTelecaller=  false
      this.isTechnician = true
    }
    if (Role=='Telecaller'){
      this.isSuperAdmin = false
      this.isAdmin =false
      this.isTelecaller=  true
      this.isTechnician = false
    }

    //      console.log(Role)
    //      if(Role == "Telecaller"){
    //         this.Telecaller=true
    //      }else if(Role =="Superadmin"){
    //        this.super=true;
    //        this.Admin=true;
    //        this.Technician=true;
    //        this.Telecaller=true;
    //      }else  if(Role =="Admin"){
    //       this.super=true;
    //        this.Admin=true;
    //        this.Technician=true;
    //        this.Telecaller=true;
    //      }else  if(Role == "Technician"){
          
           
    //        this.Technician=true;
           
    //      }
    //    }
  
  }

}
