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

  constructor(private authservice: AuthserviceService, private router:Router, private leadService: LeadService) { 
    this.username=localStorage.getItem('username')
    
  }

  ngOnInit(): void {
   

    this.role=localStorage.getItem('role')
 
    this.today = this.date.toISOString().slice(0, 10);
    console.log("sahil",this.today );
    this. getAllLeads()
    
  }


  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    this.authservice.deleteToken();
    this.router.navigate(['/login']);
  }
  getAllLeads(){
    this.leadService.getLeads().subscribe((res: any)=>{
    
    this.leadsAll = res;
    this.notification=res
    
    // console.log(this.leadsAll);
    console.log(this.notification,"note");
    
    // this.leadsAll.filter((a:any)=>{
    //   return a.nextFollowupdate == Date()
    // })
    
    })
  }


notify(){

//   this.exam=['']
//     console.log("i am here");
//       this.leadsAll.forEach((a:any) => {
//   if(a.nextFollowupdate == this.today){

//     this.exam.push(a)
//     this.len= this.exam.length - 1
//     console.log(this.exam);
   
    
//   }
  
// });
  
//  this.leadsAll=this.notification.filter((a:any)=>{
//    if(a.nextFollowupdate == this.today){
// return a 
//    }

//  })
this.leadService.getnotification().subscribe((res:any)=>{
  console.log(res,"notification");
  
})

}
}
