import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadService } from 'src/app/shared/lead.service';
import { formatDate } from '@angular/common';

import { LeadsModel } from './leads.model';
import { UserService } from 'src/app/shared/user.service';
import { data } from 'jquery';
import { SelectTeamService } from 'src/app/shared/selectteam.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  isSuperAdmin: boolean = false
  isAdmin: boolean = false
  isTelecaller: boolean = false
  isTechnician: boolean = false

  showLeadForm: boolean = false;
  showLeadTable: boolean = false;
  showAddButton: boolean = false;
  showUpdateButton: boolean = false;


  leadsModelObj: LeadsModel = new LeadsModel();
  formValue: any = FormGroup;
  leadsAll: any = [];
  status = ["New Lead", "Follow Up", "Ongoing", "Denied", "Completed"];


  currentRolees = ["Admin", "Technician", "Telecaller"]
  updateId: any;

  date = new Date()
  today: any
  times: any
  leadDetails: any = {};
  usersAll: any = [];
  assigntoList: any = [];
  currentUser: any;
  currentRole: any;
  currentTelecaller: any
  teams: any = []
  teamMember: any = []

  constructor(private formbuilder: FormBuilder, private leadService: LeadService, private userService: UserService, private TeamService: SelectTeamService) { }
  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {
    this.getallTems()
    this.currentRole = localStorage.getItem('role')
    this.currentUser = localStorage.getItem('username')

    if (this.currentRole == 'Superadmin') {
      this.isSuperAdmin = true
      this.isAdmin = false
      this.isTelecaller = false
      this.isTechnician = false

    }
    if (this.currentRole == 'Admin') {
      this.isSuperAdmin = false
      this.isAdmin = true
      this.isTelecaller = false
      this.isTechnician = false
    }
    if (this.currentRole == 'Technician') {
      this.isSuperAdmin = false
      this.isAdmin = false
      this.isTelecaller = false
      this.isTechnician = true
    }
    if (this.currentRole == 'Telecaller') {
      this.isSuperAdmin = false
      this.isAdmin = false
      this.isTelecaller = true
      this.isTechnician = false
    }

    var Role = localStorage.getItem("role")
    if (Role == 'Superadmin') {
      this.isSuperAdmin = true
      this.isAdmin = false
      this.isTelecaller = false
      this.isTechnician = false

    }
    if (Role == 'Admin') {
      this.isSuperAdmin = false
      this.isAdmin = true
      this.isTelecaller = false
      this.isTechnician = false
    }
    if (Role == 'Technician') {
      this.isSuperAdmin = false
      this.isAdmin = false
      this.isTelecaller = false
      this.isTechnician = true
    }
    if (Role == 'Telecaller') {
      this.isSuperAdmin = false
      this.isAdmin = false
      this.isTelecaller = true
      this.isTechnician = false
    }


    this.initiatedtOption()
    this.getAllUser()
    this.getAllLeads();
    this.assignto()


    this.today = this.date.toISOString().slice(0, 10);
    this.times = this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

    this.formValue = this.formbuilder.group({

      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      AltmobileNo: [''],
      emailId: ['', Validators.required],
      assignTo: ['', Validators.required],
      address: ['', Validators.required],
      followUpmode: ['Call', Validators.required],
      followUpdate: [this.today, Validators.required],
      followUptime: [this.times, Validators.required],
      comment: [''],
      nextFollowupdate: [''],
      nextFollowuptime: [''],
      status: [],
      createdBy: [this.currentUser, Validators.required]
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
  showTable() {

    this.showLeadTable = true
    this.showLeadForm = false
    this.showUpdateButton = false;
    this.showAddButton = false;

  }
  view(data: any) {
    this.leadService.getLeadsbyid(data._id)
      .subscribe(res => {
        this.leadDetails = res
      })

  }
  getAllLeads() {
    this.leadService.getLeads().subscribe((res: any) => {
      console.log(res);
      
      if (this.currentRole == 'Superadmin') {
        this.leadsAll = res;
      } else

        if (this.currentRole == 'Admin') {
              this.leadsAll
          // res.forEach((a: any) => {


          //   for (let x in this.teamMember) {    
          //     if (a.createdBy.toLowerCase() == this.teamMember[x] ) {
          //       this.leadsAll.push(a)
          //     }

          //   }
          // });
          // console.log(this.leadsAll,);

          for (let x in this.teamMember) {
            console.log(this.teamMember[x],"yee");
            
            for (let y in res) {
              if (res[y].createdBy.toLowerCase() == this.teamMember[x].toLowerCase()) {
                this.leadsAll.push(res[y])
              }
            }
          }
        }
        else {
          this.leadsAll = res.filter((a: any) => {
            return a.createdBy == this.currentUser
          })
        }


    })
  }

  getAllUser() {
    this.userService.getUsers().subscribe(res => {
      this.usersAll = res;
      console.log(res);

      // this.usersAll.forEach((element:any) => {
      //   if(element.currentRolee =='Telecaller' || element.currentRolee =='Technician'){
      //     var assign=element.currentUser
      //     this.assigntoList.push(assign)
      //   }
      // });

      // this.formValue.patchValue({assignTo:this.currentUser});
    })
  }

  getcurrentUser() {
    return localStorage.getItem('currentUser')
  }
  showForm() {
    this.formValue = this.formbuilder.group({

      name: ['', Validators.required],
      mobileNo: ['', Validators.required],
      AltmobileNo: [''],
      emailId: ['', Validators.required],
      assignTo: ['', Validators.required],
      address: ['', Validators.required],
      followUpmode: ['Call', Validators.required],
      followUpdate: [this.today, Validators.required],
      followUptime: [this.times, Validators.required],
      comment: [''],
      nextFollowupdate: [''],
      nextFollowuptime: [''],
      createdBy: [this.currentUser, Validators.required],
      status: ['New Lead'],
    })
    this.showLeadForm = true
    this.showLeadTable = false
    this.showUpdateButton = false;
    this.showAddButton = true;


  }

  postLeadsDetails() {

    this.leadService.postLeads(this.formValue.value).subscribe((res: any) => {

      alert("Lead Added Successfully!");
      this.formValue.reset();
      this.initiatedtOption()
      this.getAllLeads()
      this.showTable()
    },
      (err: any) => {
        alert("Something Went Wrong!")
      })
  }


  deleteLeads(data: any) {
    this.leadService.deleteLeads(data)
      .subscribe((res: any) => {
        alert("Records Deleted Successfully!")
        this.initiatedtOption()
        this.getAllLeads()
        this.showTable()

      })
  }

  onEdit(data: any) {
    this.showLeadForm = true
    this.showLeadTable = false
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.updateId = data._id

    this.formValue.patchValue(data)

  }

  updateLeadsDetails() {

    // this.leadService.updateLeads(this.leadsModelObj,this.leadsModelObj.id)
    this.leadService.updateLeads(this.formValue.value, this.updateId)
      .subscribe((res: any) => {
        alert("Record Updated Successfully!")
        this.formValue.reset();
        this.initiatedtOption()
        this.getAllLeads()
        this.showTable()
      })
  }

  assignto() {
    if (this.currentRole == 'Telecaller') {

      this.currentTelecaller = this.currentUser
      this.userService.getUsers().subscribe(res => {
        this.assigntoList = res.filter((a: any) => {
          return a.role == 'Technician'
        })
      })

    } else if (this.currentRole == 'Superadmin') {

      this.userService.getUsers().subscribe(res => {
        this.assigntoList = res
      })
    } else if (this.currentRole == 'Admin') {

      this.userService.getUsers().subscribe(res => {
        this.assigntoList = res.filter((a: any) => {
          return a.role != this.currentRole
        })
      })
    }
  }
  getallTems() {
    this.TeamService.getTeams().subscribe((res: any) => {
      // this.teams=res



      res.forEach((a: any) => {
        if (a.admin == this.currentUser) {
          this.teams.push(a.team_memeber)
          this.teamMember = this.teams[0]
          console.log(this.teamMember, "teammeber");
        }
      })
    })
  }
}





