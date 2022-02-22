import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Data, Router } from '@angular/router';
import { UsersModel } from '../users.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   @ViewChild('myModalClose') modalClose: any;
 
  dtOptions: DataTables.Settings = {};

  showUserForm: boolean=false;
  showUserTable: boolean=false;
  showAddButton: boolean=false;
  showUpdateButton: boolean=false;

  isSuperAdmin :boolean = false
  isAdmin :boolean = false
  isTelecaller :boolean = false
  isTechnician :boolean = false
 
 usersModelObj : UsersModel = new UsersModel();

  formValue:any= FormGroup;

  passwordForm:any=FormGroup;
  
  passwordmatch:boolean=false
  usersAll: any=[];

  

  roles=["Admin","Technician","Telecaller","Vendor"]
  updateId: any;
  userDetails: any={};
  serverErrorMessages: any;

  submitted: boolean=false;
  changepassId: any;
  

 constructor(private formbuilder: FormBuilder, private api: UserService, private router:Router) { }

  ngOnInit(): void {

    var Role= localStorage.getItem("role")
    if (Role=='Superadmin'){
      this.isSuperAdmin = true
      this.isAdmin =false
      this.isTelecaller=  false
      this.isTechnician = false
    
    }
    
    this.getAllUser()
    this.initiatedtOption()
      this.formValue = this.formbuilder.group({
        userName : ['',Validators.required],
        mobile : ['',Validators.required],
        email : ['',Validators.required],
        workingHours: ['',Validators.required],
        password:['',Validators.required],
        role: ['',Validators.required],
    })

    // change password start
  this.passwordForm = this.formbuilder.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', [Validators.required]]
    }
    // ,{
    //   validator: ConfirmedValidator('newPassword', 'confirmPassword')
    // }
    );
      // this.showUserForm=false;
      // this.showUpdateButton = false;
      // this.showAddButton = true;
      // this.showUserTable=true;
     
      // change password end
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
    var role=localStorage.getItem('role')
    this.api.getUsers().subscribe(res=>{
      console.log(res,"userbhaiya");
      if(role=='Admin'){
      this.usersAll = res.filter((ele:any) => ele.role != 'Admin');
      // console.log(res);
    }
    else{
      this.usersAll = res
    }
      })
   
  }

  showForm(){
    // this.formValue.reset();
    this.formValue = this.formbuilder.group({
      userName : ['',Validators.required],
      mobile : ['',Validators.required],
      email : ['',Validators.required],
      workingHours: ['',Validators.required],
      password:['',Validators.required],
      role: ['',Validators.required],
    });
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
      this.serverErrorMessages = 'Username or email already exists';
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
// change password

changepass(data:any){
  this.changepassId=data._id
}

submitPassword(){
    if(this.passwordForm.controls.newPassword.value === this.passwordForm.controls.confirmPassword.value){
      this.api.updatepassword(this.passwordForm.value, this.changepassId)
      .subscribe((res: any) => {
        alert("Password Updated Successfully!")
        this.passwordForm.reset();
         this.modalClose.nativeElement.click();
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
    }
    )}
      else{
        this.passwordmatch=true;
        
      }
           
}
reset()
{
  this.passwordmatch=false;
  this.passwordForm.reset();
}
}
  // this.api.updatepassword(this.passwordForm.value, this.changepassId)
  // .subscribe((res: any) => {
    // alert("Password Updated Successfully!")
    // this.passwordForm.reset();
    // console.log(this.passwordForm.value);
    
// get newPassword(){
//   return this.passwordForm.get('newPassword');
// }
// get confirmPassword(){
//   return this.passwordForm.get('confirmPassword');
// }