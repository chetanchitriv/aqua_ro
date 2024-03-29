import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { ComplaintService } from 'src/app/shared/complaint.service';
import { GraphService } from 'src/app/shared/graph.service';
import { LeadService } from 'src/app/shared/lead.service';
import { UserService } from 'src/app/shared/user.service';
import { ApexOptions } from 'ng-apexcharts';

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
    leadByTelecaller: any
  leadByTechnician:any;

  constructor(private userService:UserService,private leadService:LeadService,private complaintService:ComplaintService,private graph:GraphService) { }

  ngOnInit(): void {
    this.getallUser();
    this.getallLead();
    this.getallComplaint()
  this.getAllGraph()
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

    getAllGraph(){
      
      this.graph.getLeadBytelecaller().subscribe(
      (resp: any) => {
        console.log(resp);
        
        this.leadByTelecaller = this._prepareBarChartData([{ name: 'Total Lead', data: resp.label['telecount'] }], resp.label['telecaller'])
        this.leadByTechnician = this._prepareBarChartData([{ name: 'Total Lead', data: resp.label['techcount'] }], resp.label['technicion'])
      }
    )
    }

  
    private _prepareBarChartData(series:any = [], categories:any = []) {

        return {
          series,
          chart: {
            type: "bar",
            height: 250,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          xaxis: {
            type: "category",
            categories
          }
        }
      }
}
