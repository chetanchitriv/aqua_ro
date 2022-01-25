import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  UpdateProfile:any= FormGroup;
  userProfile: any;
 
  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.getUserProfile()
    this.UpdateProfile = this.fb.group({
      userName : [this.userProfile.userName,Validators.required],
      mobile : [this.userProfile.mobile,Validators.required],
      email : [this.userProfile.email,Validators.required],
      password : [this.userProfile.password,Validators.required],
     
      workingHours: [this.userProfile.workingHours,Validators.required],
      role: [this.userProfile.role,Validators.required],
  })

  }

  getUserProfile(){
    var currentUserId= localStorage.getItem("userId")
    this.userService.getUsersbyid(currentUserId).subscribe((res:any)=>{
      console.log(res);
      this.userProfile=res
    })
  }
}
