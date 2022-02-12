import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl, ValidationErrors} from '@angular/forms'
import { Observable } from 'rxjs';
import { ChangePasswordService } from '../../shared/changepassword.service';
import { PasswordValidators } from './Passwordvalidators';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  [x: string]: any;
  
  reactiveForm : any = FormGroup;
  serverErrorMessages: any;
  constructor( private fb:FormBuilder, private cpser:ChangePasswordService) { }

  ngOnInit(): void {
  // this.form = new FormGroup({
  //   oldPassword: new FormControl('', Validators.required, PasswordValidators.minLength(6)),
  //   newPassword: new FormControl('', Validators.required, PasswordValidators.minLength(6)),
  //   confirmPassword: new FormControl('', [Validators.required,PasswordValidators.confirmNewPassword])
  //    // Password:['',[Validators.required, Validators.minLength(6)]],
  // })
  }

  get f (){return this.reactiveForm.controls}
    


     onsubmit(){
      this.subitted = true;
        if(this.reactiveForm.invalid){
        return;
      }
    } 

}
