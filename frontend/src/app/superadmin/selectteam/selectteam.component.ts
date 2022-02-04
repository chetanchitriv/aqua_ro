import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-selectteam',
  templateUrl: './selectteam.component.html',
  styleUrls: ['./selectteam.component.css']
})
export class SelectteamComponent implements OnInit {


admin:any=[]
users:any=[]
show:boolean=false

form:any= FormGroup;
  constructor( private api: UserService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      admin:[''],
      team_member: this.fb.array([])
    })
    this.getAllUser()
  }


getAllUser(){
  this.api.getUsers().subscribe((res:any)=>{

res.forEach((a:any) => {

  if(a.role=='Admin'){
    this.admin.push(a)
  }else if(a.role =='Telecaller' || a.role == 'Technician'){
    this.users.push(a)
  }
  
});

    console.log(res,"selectem");
    
  })
}
  

onCheckboxChange(e:any) {
  const checkArray: FormArray = this.form.get('checkArray') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}


submitForm() {

  console.log(this.form.value)
}

checkboar(){

this.show=true
}
}
