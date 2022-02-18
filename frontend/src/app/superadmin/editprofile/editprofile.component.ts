import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  UpdateProfile:any= FormGroup;
  // userProfile: any={};
  currentUserId: any;
 
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.UpdateProfile = this.fb.group({
      userName : ["",Validators.required],
      mobile : ["",Validators.required],
      email : ["",Validators.required],  
      workingHours: ["",Validators.required],
      role: ["",Validators.required],
  })
    this.getUserProfile()
    
    
  }

  getUserProfile(){
     this.currentUserId=  localStorage.getItem("userId")
    this.userService.getUsersbyid(this.currentUserId).subscribe((res:any)=>{
      var userProfile=res
      console.log(userProfile);
      this.UpdateProfile.patchValue(userProfile)
      console.log(this.UpdateProfile.value);
    })
  }

  update(){
    this.userService.updateUsers(this.UpdateProfile.value,this.currentUserId).subscribe(res=>{
      if(res){    
        alert("Profile Updated Successfully");
        this.logout()
      }
    })
  }
  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}