import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from 'src/app/shared/stock.service';
import { StockallotService } from 'src/app/shared/stockallot.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-stockallotment',
  templateUrl: './stockallotment.component.html',
  styleUrls: ['./stockallotment.component.css']
})
export class StockallotmentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showstockForm: boolean= false;
  showstockTable: boolean=false;

  formStockAllot: any=FormGroup;
  stockAll: any=[]
  usersAll: any;

 date = new Date()
  today: any
  times: any
  stockData: any;
  stockallotAll: any=[];
 

  constructor(private formbuilder: FormBuilder, private api: StockService, private userservice:UserService, private stockallotservice:StockallotService, router:Router) { }

  ngOnInit(): void {

    this. initiatedtOption()
    this.getAllUser()
    this.getAllStock()
   this.getAllStockallot()

  this.today = this.date.toISOString().slice(0, 10);
  this.times =  this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
  console.log(this.today)
    this.formStockAllot = this.formbuilder.group({
      spare_name : ['',Validators.required],
      qnt  : ['',Validators.required],
      techname  : ['',Validators.required],
      date:  [this.today,Validators.required],
     
  });
  }
  getAllStockallot(){
    this.stockallotservice.getStockallot().subscribe((res: any) => {
      this.stockallotAll = res;    
      console.log(res,"niya");
      
  })
}

postStockallotDetails(){
  this.stockallotservice.postStockallot(this.formStockAllot.value).subscribe(res=>{
    alert("Stock Added Successfully!");
    this.formStockAllot.reset();

  this.getAllStockallot()
  this.showStockTable()
  })
}

  getAllStock(){
    this.api.getStock().subscribe((res:any) => {
      this.stockAll = res;
      console.log(res,"nisha");
      
    })
  }

  getAllUser(){
   this.userservice.getUsers().subscribe((res:any)=>{
      this.usersAll = res.filter((a:any)=>{
        return a.role == 'Technician'
      })
     console.log(res, "ni");
     
      })
    }
      initiatedtOption(){
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu:[10,20,30]
        };


      }
    
  showStockForm(){
    this.showstockForm=true;
    this.showstockTable=false;

  }
  showStockTable(){
    this.showstockForm=false;
    this.showstockTable=true;

  }
}

