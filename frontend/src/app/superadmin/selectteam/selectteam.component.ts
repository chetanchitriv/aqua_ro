import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectTeamService } from 'src/app/shared/selectteam.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-selectteam',
  templateUrl: './selectteam.component.html',
  styleUrls: ['./selectteam.component.css']
})
export class SelectteamComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
 
  showTeamForm: boolean = false;
  showTeamTable: boolean = false;
  showAddButton: boolean = false;
  showUpdateButton: boolean = false;
  showformupdate: boolean = false;


  admins: any = []
  users: any = []
  // show: boolean = false
  form: any = FormGroup;
  teamUpdate:any = FormGroup;
  teamarr:any=[]
  updateId: any;
  data:any;
viewTeam:any=[]
  constructor(private api: UserService, private fb: FormBuilder, private http: HttpClient, private ser: SelectTeamService) { }
 
  ngOnInit(): void {
    this.form = this.fb.group({
      admin: [''],
      team_member: this.fb.array([])
    })
 
    this.getAllUser()
    this.getallTeam()
 
    this.initiatedtOption()
    
  
  }

  initiatedtOption(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu:[10,20,30]
    };

    this.teamUpdate = this.fb.group({
      admin: [''],
      team_member: this.fb.array([])
    })
 
  }
  getAllUser() {
    this.api.getUsers().subscribe((res: any) => {

      res.forEach((a: any) => {

        console.log(a,"userbhaiya");
        
        if (a.role == 'Admin') {
          this.admins.push(a)
        } else if (a.role == 'Telecaller' || a.role == 'Technician') {
          this.users.push(a)
        }

      });

      console.log(res, "selectem");

    })
  }


  onCheckboxChange(e: any) {
    const team_member: FormArray = this.form.get('team_member') as FormArray;

    if (e.target.checked) {
      team_member.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      team_member.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          team_member.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  submitForm() {
    console.log(this.form.value)

    this.ser.postTeams(this.form.value).subscribe(
      (res: any) => {
        alert("Team added succesfully")
        this.form.reset();
        this.initiatedtOption()
        this.getallTeam()
        this.showTable()

        // console.log(res, "js");

      })
  }

  checkboar() {

    // this.show = true
  }

  getallTeam() {
    
    this.ser.getTeams().subscribe((res: any) => {
    
     this.teamarr=res;
       console.log(this.teamarr, "j");
    })

  }
  // sheetal mam

  showForm() {

    this.form = this.fb.group({
      admin: [''],
      team_member: this.fb.array([''])
    })

    this.showTeamForm = true
    this.showTeamTable = false
    this.showUpdateButton = false;
    this.showAddButton = true;
    this.showformupdate=false;

  }
  showTable(){
    this.initiatedtOption()
    
    this.showTeamTable=true
    this.showTeamForm=false
    this.showUpdateButton = false;
    this.showAddButton = false;
    this.showformupdate=false;
  
  }

  deleteTeams(data: any) {
    this.ser.deleteTeams(data._id)
      .subscribe((res: any) => {
        alert("Records Deleted Successfully!");
        this.initiatedtOption()
        this.getallTeam()
        this.showTable()
      })
  }
 
  onEdit(data : any){
  console.log(data);

  this.showTeamTable=false
  this.showformupdate=true;
    this.showTeamForm=false
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.updateId=data._id
  
  this.teamUpdate.patchValue(data)
}

updateTeamDetails(){
  console.log(this.updateId);
  
  this.ser.updateTeams(this.teamUpdate.value,this.updateId)
.subscribe((res: any)=>{
  console.log(res);
  
  alert("Record Updated Successfully!")
  this.form.reset();
  this.initiatedtOption()
 
  this.getallTeam()

  this.showTable()
})
}
view(data:any){
 
this.viewTeam.push(data)
}
nullarr(){
  this.viewTeam=[]
}
}


