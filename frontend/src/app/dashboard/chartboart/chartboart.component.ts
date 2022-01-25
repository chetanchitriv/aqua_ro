import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { ComplaintService } from 'src/app/shared/complaint.service';
import { LeadService } from 'src/app/shared/lead.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-chartboart',
  templateUrl: './chartboart.component.html',
  styleUrls: ['./chartboart.component.css']
})
export class ChartboartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartoptions: any={};
    usersAll: any=[];
    AllLeads: any=[];
    AllComplaints: any=[];
    userCount: any;
  adminCount:any;
  technicianCount:any;
  telecallerCount:any;
    leadCount: any;
    complaintCount: any;
    teleCallerList: any=[];

  constructor(private userService:UserService,private leadService:LeadService,private complaintService:ComplaintService) { }

  ngOnInit(): void {
    this.getallUser();
    this.getallLead();
    this.getallComplaint()
    this.chartoptions={
      chart: {
      type: 'column'
  },
  // title: {
  //     text: 'Monthly Average Rainfall'
  // },
  // subtitle: {
  //     text: 'Source: WorldClimate.com'
  // },
  xAxis: {
      categories: [
          'monika',
          'shital',
          'sahil',
          'shashank',
          'nisha',
          'komal',
          'mona',
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'total count'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'Telecallers',
      data: [10,5,7,2,6,8,3]
  
  }]
  }
    
 
  }

    getallUser(){
    this.userService.getUsers().subscribe(res=>{
        this.usersAll = res;
        this.userCount=this.usersAll.length
        var admincount=0;
        var techniciancount=0;
        var telecallercount=0;
        this.usersAll.forEach((element:any) => {
            if(element.role=='Admin'){
                admincount++
            }
        });
        this.usersAll.forEach((element:any) => {
            if(element.role=='Technician'){
                techniciancount++
            }
        });
        this.usersAll.forEach((element:any) => {
            if(element.role=='Telecaller'){
               telecallercount++
               this.teleCallerList.push(element.userName)
            }
        });
        console.log(this.teleCallerList);
        
        this.adminCount=admincount
        this.technicianCount=techniciancount
        this.telecallerCount=telecallercount


        })
    }
    getallLead(){
    this.leadService.getLeads().subscribe(res=>{
        this.AllLeads = res;
        this.leadCount=this.AllLeads.length
        })
    }
    getallComplaint(){
    this.complaintService.getComplaints().subscribe(res=>{
        this.AllComplaints = res;
        this.complaintCount=this.AllComplaints.length
        })
    }
    
}
