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
  userProfile: any={};
 
  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.getUserProfile()
   
  }

  getUserProfile(){
    var currentUserId= localStorage.getItem("userId")
    this.userService.getUsersbyid(currentUserId).subscribe((res:any)=>{
      console.log(res);
      this.userProfile=res
    })
    this.UpdateProfile = this.fb.group({
      userName : ["",Validators.required],
      mobile : ["",Validators.required],
      email : ["",Validators.required],
      password : ["",Validators.required],
     
      workingHours: ["",Validators.required],
      role: ["",Validators.required],
  })
  
  }
}

