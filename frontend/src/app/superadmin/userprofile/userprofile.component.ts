import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userProfile: any;
  currentRole: any;
  
  passwordForm:any=FormGroup;
  passwordmatch:boolean=false
  formbuilder: any;
  changepassId: any;
  usersAll: any=[];
  currentUserId:any
  constructor(private userService:UserService, formbuilder:FormBuilder ) { }

  ngOnInit(): void {
   this.currentRole=localStorage.getItem('role')
   this.currentUserId= localStorage.getItem("userId")
   this.userService.getUsersbyid(this.currentUserId).subscribe((res:any)=>{
     console.log(res);
     this.userProfile=res
   })
    // change password start
  this.passwordForm = this.formbuilder.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', [Validators.required]]
});
  // this.showUserForm=false;
  // this.showUpdateButton = false;
  // this.showAddButton = true;
  // this.showUserTable=true;
  }

 

submitPassword(){
  console.log("hi");
  
     if(this.passwordForm.controls.newPassword.value === this.passwordForm.controls.confirmPassword.value){
      this.userService.updatepassword(this.passwordForm.value, this.currentUserId)
      .subscribe((res: any) => {
        alert("Password Updated Successfully!")
        this.passwordForm.reset();
        
    }
    )}
      else
           this.passwordmatch=true;
}
}
