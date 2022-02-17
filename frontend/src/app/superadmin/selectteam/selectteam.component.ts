import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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


  admins: any = []
  technician: any = []
  telecaller: any = []
  show: boolean = false
  form: any = FormGroup;
  teamarr: any = []
  display: any
  updateId:any
  showUpdate:boolean=false
  showbutton:boolean=true
  Admins:any=[]

  constructor(private api: UserService, private fb: FormBuilder, private http: HttpClient, private ser: SelectTeamService) { }

  ngOnInit(): void {

   
    this.getAllUser()
    this.getallTeam()
    // this.chngecss()
    this.initiatedtOption()
    this.form = this.fb.group({
      admin: [''],
      technician: [''],
      telecaller: ['']

    })
  

  }

  initiatedtOption() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [10, 20, 30]
    };
  }
  getAllUser() {
    this.api.getUsers().subscribe((res: any) => {
   
      res.forEach((a: any) => {

        if (a.role == 'Admin') {
          this.admins.push(a)

        } else if (a.role == 'Telecaller') {
          this.technician.push(a)
        } else if (a.role == 'Technician') {
          this.telecaller.push(a)
        }

      });


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
        alert("Team Created")
   
        this.getallTeam()

        this.showTeamTable = true
        this.showTeamForm = false
        this.showUpdateButton = false;
        this.showAddButton = false;
        this.form.reset()

      }

    )


    console.log(this.form.value)
  }

  checkboar() {

    // this.show = true
  }

  getallTeam() {

    this.ser.getTeams().subscribe((res: any) => {

      this.teamarr = res
      console.log(this.teamarr, "j");

    })
  }

  // sheetal mam

  showForm() {
    this.showTeamForm = true
    this.showTeamTable = false
    this.showUpdateButton = false;
    this.showAddButton = true;
this.chngecss() 
   

  }

  showTable() {
    this.initiatedtOption()

    this.showTeamTable = true
    this.showTeamForm = false
    this.showUpdateButton = false;
    this.showAddButton = false;

  }

  deleteTeams(data: any) {
 
    this.ser.deleteTeams(data)
      .subscribe((res: any) => {
      
        alert("Records Deleted Successfully!");
        window.location.reload()

     
        this.showTable()
       this.chngecss()
      })
  }

  onEdit(data: any) {
    this.showTeamForm = true
    this.showTeamTable = false
    this.showUpdate=true
    this.showbutton=false

    console.log(data, "data");
    console.log(this.form.controls.admin.value,"admin hai bhaiya ");
    
this.updateId=data._id
    this.form.patchValue(data)
    // this.form.controls.admin.patchValue(data.Admin)
    

    
  }

  update(){
    this.ser.updateTeams(this.form.value,this.updateId).subscribe((res:any)=>{
      alert("team update succefully")
      this.form.reset()
      this.getallTeam()
      this.showTable()
    })
  }

  chngecss() {
   
    this.showUpdate=false
    this.showbutton=true
    this.getallTeam()
    this.admins.forEach((element:any) => {
      console.log(element,"heyyy");

       for(let x in this.teamarr){
     
         
         if(element.userName == this.teamarr[x].admin){
          element.userName = 'hide_element'
        console.log(element.userName,"jadu");

        
         }
       }
     });
  }
}

