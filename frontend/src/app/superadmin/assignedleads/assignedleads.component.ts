import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/shared/lead.service';

@Component({
  selector: 'app-assignedleads',
  templateUrl: './assignedleads.component.html',
  styleUrls: ['./assignedleads.component.css']
})
export class AssignedleadsComponent implements OnInit {

  assignleads:any=[]
  username :any

  constructor(private leadService: LeadService) { }
  dtOptions:DataTables.Settings={}
  ngOnInit(): void {
this.username=localStorage.getItem('username')
    this. getAllLeads()
    this.initiatedtOption()
  }

  initiatedtOption(){
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu:[10,20,30]
    };
   
  
  }

  getAllLeads(){
     
    this.leadService.getLeads().subscribe((res: any)=>{  
   console.log(res);
  this.assignleads=res.filter((a:any)=>{
    return a.assignTo == this.username
  })
    })
  }
}
