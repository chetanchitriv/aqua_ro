import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/authservice.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValue: any = FormGroup;
  users: any = [];
  activeuser: any;
  serverErrorMessages: any;
  chukl:boolean=false
  

  constructor(private formbuilder: FormBuilder,  private service: UserService, private authservice: AuthserviceService, private notificationser:NotificationService,  private router: Router) { }

  ngOnInit(): void {

    // this.createNotification()

    if(this.authservice.isLoggedIn()){
    this.router.navigate(['/dashboard']);
    }
    this.formValue = this.formbuilder.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    })
    this.getAllUsers()
  }
  getAllUsers() {
    this.service.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
      
    })
  }

  login() {
      this.authservice.Login(this.formValue.value).subscribe(
         (res:any) => {
           console.log(res);
           if(res.success){
            var userData=res['UserData']
            // console.log(userData);
            
            this.authservice.setToken(res['token']);
            this.authservice.setUserName(userData.userName)
            localStorage.setItem("userId",userData.userId)
            this.authservice.setRole(userData.role)
            this.router.navigate(['/dashboard']);
           }
           
       
      },
      err => {
        // alert("kahi tari chukal ahe ")
        this.chukl=true
      }
      )
  }
  createNotification(){
    var data={}
    this.notificationser.creatNoti(data).subscribe((res:any) => {
     
    })  

  }
}

