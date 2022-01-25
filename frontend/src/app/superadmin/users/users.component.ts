import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Data, Router } from '@angular/router';
import { UsersModel } from '../users.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  dtOptions: DataTables.Settings = {};
  showUserForm: boolean=false;
  showUserTable: boolean=false;
  showAddButton: boolean=false;
  showUpdateButton: boolean=false;
 
 usersModelObj : UsersModel = new UsersModel();
  formValue:any= FormGroup;
  usersAll: any=[];
  

  roles=["Admin","Technician","Telecaller"]
  updateId: any;
  userDetails: any={};
  serverErrorMessages: any;
  

 constructor(private formbuilder: FormBuilder, private api: UserService, private router:Router) { }

  ngOnInit(): void {
    
    this.getAllUser()
    this.initiatedtOption()
      this.formValue = this.formbuilder.group({
        userName : ['',Validators.required],
        mobile : ['',Validators.required],
        email : ['',Validators.required],
        password : ['',Validators.required],
       
        workingHours: ['',Validators.required],
        role: ['',Validators.required],
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
    this.showUserForm=false;
    this.showUserTable=true;
    this.showUpdateButton = false;
    this.showAddButton = false;
  
  }
  view(data:any){
    this.api.getUsersbyid(data._id)
    .subscribe(res=>{
      this.userDetails=res
    })

  }
  getAllUser(){
    this.api.getUsers().subscribe(res=>{
      this.usersAll = res;
      console.log(res);
      

      })
   
  }

  showForm(){
    this.showUserForm=true
    this.showUpdateButton = false;
    this.showAddButton = true;
    this.showUserTable=false;
  }
 
  showFormupdate(){
    this.showUserForm=true
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.showUserTable=false;
}

  postUsersDetails(){
  this.api.postUsers(this.formValue.value).subscribe(res=>{
    alert("User Added Successfully!");
    this.formValue.reset();
    this.initiatedtOption()
  this.getAllUser()
  this.showTable()
  },
  err => {
    if (err.status === 422) {
      this.serverErrorMessages = err.error.join('<br/>');
      alert(this.serverErrorMessages)
    }
    else
      this.serverErrorMessages = 'Something went wrong. Please contact admin.';
      alert(this.serverErrorMessages)
  })
}


deleteUsers(data:any){
  this.api.deleteUsers(data._id)
  .subscribe(res=>{
    alert("Records Deleted Successfully!")
    this.initiatedtOption()
  this.getAllUser()
  this.showTable()
    
  })
}

onEdit(data:any){
  this.showUserTable=false
    this.showUserForm=true
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.updateId=data._id

  this.formValue.patchValue(data)
}

updateUsersDetails(){
  console.log(this.updateId);
  
  this.api.updateUsers(this.formValue.value,this.updateId)
.subscribe((res: any)=>{
  console.log(res);
  
  alert("Record Updated Successfully!")
  this.formValue.reset();
  this.initiatedtOption()
  this.getAllUser()
  this.showTable()
})

}



 
}
