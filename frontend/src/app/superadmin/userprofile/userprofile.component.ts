import { Component, OnInit } from '@angular/core';
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

  constructor(private userService:UserService) { }

  ngOnInit(): void {
   this.currentRole=localStorage.getItem('role')
   var currentUserId= localStorage.getItem("userId")
   this.userService.getUsersbyid(currentUserId).subscribe((res:any)=>{
     console.log(res);
     this.userProfile=res
   })
  }

}
