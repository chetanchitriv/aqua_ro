import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from 'src/app/shared/complaint.service';
import { LeadService } from 'src/app/shared/lead.service';
import { UserService } from 'src/app/shared/user.service';
import { ComplaintsModel } from './complaints.model';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  dtOptions:DataTables.Settings={}
  searchLead: any=FormGroup;
  allLeads: any=[];
  leadData: any=null;
  showsearchform: boolean=false;
  showComplaintForm: boolean=false;
  showComplaintTable:boolean=false; 
  showComplaintUpdateForm:boolean=false

  date = new Date()
  today:any
  times:any

  complaintsModelObj : ComplaintsModel = new ComplaintsModel();
  complaintForm:any= FormGroup;
  complaintsAll: any=[];

 
  roles=["Admin","Technician","Telecaller"]
  
  getAllComplaint: any;
  updateId: any;
  complaintUpdateForm:any= FormGroup;
  complaintDetails: any={};
  usersAll: any=[];
  assigntoList: any=[];


  constructor(private formbuilder:FormBuilder, private leadService:LeadService, private api:ComplaintService, private userService: UserService) { }
  

  ngOnInit(): void {
  
    this.initiatedtOption()
    this.getAllUser()
    this.getAllLeads()
    this.getAllComplaints()
   
   
    this.complaintUpdateForm = this.formbuilder.group({
      name : ['',Validators.required],
      mobileNo : ['',Validators.required],
      emailId : ['',Validators.required],
      assignTo : ['',Validators.required],
      address : ['',Validators.required],
      followUpmode : ['Call',Validators.required],
      followUpdate : ['',Validators.required],
      followUptime : ['',Validators.required],
      comment : ['',Validators.required],
      nextFollowupdate : ['',Validators.required],
      nextFollowuptime : ['',Validators.required],
      complaintInfo:['',Validators.required],
      complaintDate:[this.today,Validators.required]
    })
 
    
    
  }

  showSearchForm(){
    this.searchLead = this.formbuilder.group({
   
      mobile : ['',Validators.required]
    })
      this.showsearchform=true
      this.showComplaintForm=false
      this.showComplaintTable=false
      this.showComplaintUpdateForm=false
  }

  getAllLeads(){
    this.leadService.getLeads().subscribe(res=>{
      this.allLeads=res
      console.log(res);
      
    })
  }  

  search(){
    var leadExist=false;
    console.log(this.searchLead.controls.mobile.value);
    
    this.today = this.date.toISOString().slice(0, 10);
    this.times =  this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
    this.allLeads.forEach((element:any )=> {
      if(element.mobileNo==this.searchLead.controls.mobile.value){
        this.leadData=element
        leadExist=true
      }
    });
    
    if(leadExist){
      this.showsearchform=false;
      this.showComplaintForm=true
      this.showComplaintTable=false
      this.showComplaintUpdateForm=false
      this.complaintForm = this.formbuilder.group({
        name : [this.leadData.name,Validators.required],
        mobileNo : [this.leadData.mobileNo,Validators.required],
        emailId : [this.leadData.emailId,Validators.required],
        assignTo : [this.leadData.assignTo,Validators.required],
        address : [this.leadData.address,Validators.required],
        followUpmode : [this.leadData.followUpmode,Validators.required],
        followUpdate : [this.leadData.followUpdate,Validators.required],
        followUptime : [this.leadData.followUptime,Validators.required],
        comment : [this.leadData.comment,Validators.required],
        nextFollowupdate : [this.leadData.nextFollowupdate,Validators.required],
        nextFollowuptime : [this.leadData.nextFollowuptime,Validators.required],
        complaintInfo:['',Validators.required],
        complaintDate:[this.today,Validators.required]
      })
    }
  
    else{
      alert("Lead does not exist with this number")
    }
    
   
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
    this.showComplaintForm=false
    this.showComplaintTable=true
    this.showComplaintUpdateForm=false
    this.showsearchform=false
  }

  view(data:any){
    this.api.getComplaintsbyid(data._id)
    .subscribe(res=>{
      this.complaintDetails=res
    })

    
  }

getAllComplaints(){

  this.api.getComplaints().subscribe((res: any)=>{
  this.complaintsAll = res;
  
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
  postComplaintsDetails(){


    this.api.postComplaints(this.complaintForm.value).subscribe((res: any)=>{
      console.log(res);
      this.showsearchform=false
      this.showComplaintTable=true
      this.showComplaintForm=false
      this.showComplaintUpdateForm=false
      alert("Complaint Added Successfully!");
      
      this.getAllComplaints();
    },
      (  err: any)=>{
      alert("Something Went Wrong!")
    })
}

deleteComplaints(data:any){
  this.api.deleteComplaints(data._id)
  .subscribe((res: any)=>{
    alert("Records Deleted Successfully!")
    this.initiatedtOption()
    this.getAllComplaints();
    this.showTable()
   

  })
}

onEdit(data:any){   
  console.log(data);
  this.showComplaintUpdateForm=true
  this.showsearchform=false
  this.showComplaintForm=false
  this.showComplaintTable=false
  this.updateId= data._id
 
  this.complaintUpdateForm.patchValue(data)
}

updateComplaintsDetails(){
 

 this.api.updateComplaints(this.complaintUpdateForm.value,this.updateId)

  
.subscribe((res: any)=>{
  alert("Record Updated Successfully!")
  this.showsearchform=false
  this.showComplaintTable=true
  this.showComplaintForm=false
  this.showComplaintUpdateForm=false
  this.initiatedtOption()
  this.getAllComplaints();
  this.showTable()
 
})

}



  // showFormupdate(){
  //   this.showComplaintForm=true
  //   this.showComplaintTable=false
  //   this.showComplaintUpdateForm:boolean=false
  //   this.showsearchform=false
  // }
  }
