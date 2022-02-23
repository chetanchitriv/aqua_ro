import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from 'src/app/shared/lead.service';

@Component({
  selector: 'app-assignedleads',
  templateUrl: './assignedleads.component.html',
  styleUrls: ['./assignedleads.component.css']
})
export class AssignedleadsComponent implements OnInit {

  dtOptions:DataTables.Settings={}

  isSuperAdmin :boolean = false
  isAdmin :boolean = false
  isTelecaller :boolean = false
  isTechnician :boolean = false
  
  date = new Date()
  today: any
  times: any
  leadDetails: any = {};
  assignleads:any=[]
  username :any
  showLeadTable: boolean=true;
  showupdateForm: boolean=false;
  updateId: any;
  formValue: any = FormGroup;
  currentUser: any;
  status = ["New Lead", "Follow Up", "Ongoing", "Denied", "Completed"];

  constructor(private formbuilder: FormBuilder, private leadService: LeadService) { 
   
    this.initiatedtOption()
  }
  
  ngOnInit(): void {

    this.initiatedtOption()
    this.getAllLeads()

    this.today = this.date.toISOString().slice(0, 10);
    this.times = this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

    this.formValue = this.formbuilder.group({

      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      AltmobileNo: [''],
      emailId: ['', Validators.required],
      assignTo: ['', Validators.required],
      address: ['', Validators.required],
      followUpmode: ['Call', Validators.required],
      followUpdate: [this.today, Validators.required],
      followUptime: [this.times, Validators.required],
      comment: [''],
      nextFollowupdate: [''],
      nextFollowuptime: [''],
      createdBy: [this.currentUser, Validators.required],
      status: ['New Lead'],
    
    })
    
this.username=localStorage.getItem('username')
this.initiatedtOption()
   this. getAllLeads()
  
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
    return (a.assignTo == this.username && a.status != 'Completed')
   
  })
 
  
})
    
  }

  onEdit(data: any) {
    this.showupdateForm = true
    this.showLeadTable = false
   
    this.updateId = data._id

    this.formValue.patchValue(data)

  }
  updateLeadsDetails() {

    // this.leadService.updateLeads(this.leadsModelObj,this.leadsModelObj.id)
    this.leadService.updateLeads(this.formValue.value, this.updateId)
      .subscribe((res: any) => {
        alert("Record Updated Successfully!")
        this.formValue.reset();
        this.initiatedtOption()
        this.getAllLeads()
        this.showTable()
      })
    }
      view(data: any) {
        this.leadService.getLeadsbyid(data._id)
          .subscribe(res => {
            this.leadDetails = res
          })
        }
    
// deleteLeads(data: any) {
//     this.leadService.deleteLeads(data._id)
//       .subscribe((res: any) => {
//         alert("Records Deleted Successfully!")
//         this.initiatedtOption()
//         this.getAllLeads()
//         this.showTable()

//       })

    showTable() {
   
    this.showLeadTable = true;
    this.showupdateForm = false;
    this.initiatedtOption()
  }

  showUpdateForm() {

    this.showLeadTable = false;
    this.showupdateForm = true;
  }
}
