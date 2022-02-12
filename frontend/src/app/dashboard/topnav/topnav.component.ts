import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { LeadService } from 'src/app/shared/lead.service';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {  
  username: any
  leadsAll:any=[]
  notification:any=[]
  date = new Date()
  today:any
  exam:any=[]
  len:any
  role:any
  note:boolean=false
  assignleads:any=[]
  leadnotification:any=[]

  constructor(private authservice: AuthserviceService, private router:Router, private leadService: LeadService) { 
    this.username=localStorage.getItem('username')
    
  }

  ngOnInit(): void {
    // console.log(this.assignleads,"sahilchaware");
    
   this.notify()
   this.getAllLeads()
   this.len = this.assignleads.length + this.leadsAll.length

    this.role=localStorage.getItem('role')
 
    this.today = this.date.toISOString().slice(0, 10);
    // console.log("sahil",this.today );
    // this. getAllLeads()
    
  }


  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    this.authservice.deleteToken();
    this.router.navigate(['/login']);
  }
  // getAllLeads(){
  //   this.leadService.getLeads().subscribe((res: any)=>{
    
  //   this.leadsAll = res;
  //   this.notification=res
    
  //   // console.log(this.leadsAll);
  //   console.log(this.notification,"note");
    
  //   // this.leadsAll.filter((a:any)=>{
  //   //   return a.nextFollowupdate == Date()
  //   // })
    
  //   })
  // }


notify(){


this.leadService.getnotification().subscribe((res:any)=>{
// console.log(res.lead,"notification");

  if( this.role == 'Superadmin' || this.role == 'Admin'){
    this.leadsAll=res.lead
  this.len=res.lead.length 
  }else{
    console.log("i am not sa");
    
    this.leadsAll=res.lead.filter((a:any)=>{
          return a.createdBy == this.username
    })
this.len=this.leadsAll.length
  }
  
 
  
})

}

getAllLeads(){
     
  this.leadService.getLeads().subscribe((res: any)=>{  
<<<<<<< HEAD

this.assignleads=res.filter((a:any)=>{
  return a.assignTo == this.username && a.status == 'New Lead'
=======
    this.assignleads=res
 
this.leadnotification=this.assignleads.filter((a:any)=>{
  return  a.status == "New Lead" && a.assignTo == this.username
>>>>>>> 601e28f808397bcc2e7aa9027a3de3d066c9d549
})
// console.log(this.assignleads,"leadsres");
// .filter((a:any)=>{
//   return a.assignTo == this.username && a.status == "New Lead"
// })
  })
}
}
