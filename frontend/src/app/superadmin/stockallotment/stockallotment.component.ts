import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockService } from 'src/app/shared/stock.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-stockallotment',
  templateUrl: './stockallotment.component.html',
  styleUrls: ['./stockallotment.component.css']
})
export class StockallotmentComponent implements OnInit {

  showstockForm: boolean= false;
  showstockTable: boolean=false;

  // formStockAllot: any=FormGroup;
  stockAll: any=[]
  usersAll: any;

 

  constructor(private formbuilder: FormBuilder, private api: StockService, private userservice:UserService) { }

  ngOnInit(): void {
    this.getAllStock()
    this.getAllUser()
  }
  
  getAllStock() {
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
  showStockForm(){
    this.showstockForm=true;
    this.showstockTable=false;

  }
  showStockTable(){
    this.showstockForm=false;
    this.showstockTable=true;

  }
}

