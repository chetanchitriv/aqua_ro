import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LeadService } from 'src/app/shared/lead.service';
import { formatDate } from '@angular/common';

import { LeadsModel } from './leads.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
 
 
  showLeadForm: boolean=false;
  showLeadTable: boolean=false;
  showAddButton: boolean=false;
  showUpdateButton: boolean=false;
 


  leadsModelObj : LeadsModel = new LeadsModel();
  formValue:any= FormGroup;
  leadsAll: any=[];
 

  roles=["Admin","Technician","Telecaller"]
  updateId: any;

  date = new Date()
  today: any
  times: any
  leadDetails: any={};
  usersAll: any=[];
  assigntoList: any=[];
  
  


  constructor(private formbuilder: FormBuilder, private leadService: LeadService, private userService: UserService) {}
  dtOptions:DataTables.Settings={}
    
  ngOnInit(): void {

    this.initiatedtOption()
    this.getAllUser()
    this.getAllLeads();
   

    this.today = this.date.toISOString().slice(0, 10);
    this.times =  this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
    console.log(this.today)

  
  this.formValue = this.formbuilder.group({
   
    name : ['',Validators.required],
    mobileNo : ['',Validators.required],
    emailId : ['',Validators.required],
    assignTo : ['',Validators.required],
    address : ['',Validators.required],
    followUpmode : ['Call',Validators.required],
    followUpdate : [this.today,Validators.required],
    followUptime : [this.times,Validators.required],
    comment : [''],
    nextFollowupdate : [''],
    nextFollowuptime : [''],
  })
}
  
  initiatedtOption(){
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu:[10,20,30]
    };
   
  
  }
  showTable(){
   
    this.showLeadTable=true
    this.showLeadForm=false
    this.showUpdateButton = false;
    this.showAddButton = false;

  }
  view(data:any){
    this.leadService.getLeadsbyid(data._id)
    .subscribe(res=>{
      this.leadDetails=res
    })

  }
  getAllLeads(){
    this.leadService.getLeads().subscribe((res: any)=>{
    this.leadsAll = res;
    console.log(this.leadsAll);
    
    })
  }

  getAllUser(){
    this.userService.getUsers().subscribe(res=>{
      this.usersAll = res;
      this.usersAll.forEach((element:any) => {
        this.assigntoList.push(element.userName)
      });
      })
   
  }

  showForm(){
    console.log(this.times);
    this.formValue = this.formbuilder.group({
   
      name : ['',Validators.required],
      mobileNo : ['',Validators.required],
      emailId : ['',Validators.required],
      assignTo : ['',Validators.required],
      address : ['',Validators.required],
      followUpmode : ['Call',Validators.required],
      followUpdate : [this.today,Validators.required],
      followUptime : [this.times,Validators.required],
      comment : [''],
      nextFollowupdate : [''],
      nextFollowuptime : [''],
    })
    this.showLeadForm=true
    this.showLeadTable=false
    this.showUpdateButton = false;
    this.showAddButton = true;
  
  
  }

  postLeadsDetails(){
  this.leadService.postLeads(this.formValue.value).subscribe((res: any)=>{
    alert("Lead Added Successfully!");
    this.formValue.reset();
    this.initiatedtOption()
    this.getAllLeads()
    this.showTable()
  },
    (  err: any)=>{
    alert("Something Went Wrong!")
  })
  }


deleteLeads(data:any){
  this.leadService.deleteLeads(data._id)
  .subscribe((res: any)=>{
    alert("Records Deleted Successfully!")
    this.initiatedtOption()
    this.getAllLeads()
    this.showTable()
   
  })
}

onEdit(data:any){
  this.showLeadForm=true
  this.showLeadTable=false
  this.showUpdateButton = true;
  this.showAddButton = false;
  this.updateId=data._id
 
  this.formValue.patchValue(data)
  
}

updateLeadsDetails(){
  
  // this.leadService.updateLeads(this.leadsModelObj,this.leadsModelObj.id)
  this.leadService.updateLeads(this.formValue.value,this.updateId)
.subscribe((res: any)=>{
  alert("Record Updated Successfully!")
  this.formValue.reset();
  this.initiatedtOption()
  this.getAllLeads()
  this.showTable()
})
  }

}



