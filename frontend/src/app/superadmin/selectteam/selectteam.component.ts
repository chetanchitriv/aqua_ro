import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  users: any = []
  show: boolean = false
  form: any = FormGroup;
  teamarr:any=[]

  constructor(private api: UserService, private fb: FormBuilder, private http: HttpClient, private ser: SelectTeamService) { }

  ngOnInit(): void {

 
    this.getAllUser()
    this.getallTeam()
    this.initiatedtOption()
    this.form = this.fb.group({
      admin: [''],
      team_member: this.fb.array([])
    })
 
  
  }

  initiatedtOption() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [10, 20, 30]
    };}

  getAllUser() {
    this.api.getUsers().subscribe((res: any) => {

      res.forEach((a: any) => {

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
    this.ser.postTeams(this.form.value).subscribe(
      (res: any) => {
        console.log(res, "js");

      }
    )


    console.log(this.form.value)
  }

  checkboar() {

    this.show = true
  }
  getallTeam() {
    this.ser.getTeams().subscribe((res: any) => {
    
     this.teamarr=res
       console.log(this.teamarr, "j");

    })
  }

  // sheetal mam

  showForm() {
    this.showTeamForm = true
    this.showTeamTable = false
    this.showUpdateButton = false;
    this.showAddButton = true;


  }
  showTable(){
 
    this.showTeamTable=true
    this.showTeamForm=false
    this.showUpdateButton = false;
    this.showAddButton = false;
  
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
  onEdit(data:any){

  }


}

