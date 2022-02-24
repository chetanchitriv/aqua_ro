
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { stockModel } from './stock.model';
import { StockService } from 'src/app/shared/stock.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showUserForm: boolean=false;
  showUserTable: boolean=false;
  showAddButton: boolean=false;
  showUpdateButton: boolean=false;
 stockModelObj : stockModel=new stockModel();
  formStock:any= FormGroup;
  stockAll: any=[];
  updateId: any;
  stockDetails: any={};
  serverErrorMessages: any;
  date = new Date()
  today: any
 
  stockData: any;
  constructor(private formbuilder: FormBuilder, private api: StockService, private router:Router) { }

  ngOnInit(): void {
    this.getAllStock()
    this.initiatedtOption()
    this.today = this.date.toISOString().slice(0, 10);

    this.formStock = this.formbuilder.group({
      spare_name : ['',Validators.required],
      qnt  : ['',Validators.required],
      availqnt:['',Validators.required],
      purchaseAmount  : ['',Validators.required],
      sellingPrice  : ['',Validators.required],
      unitprice  : ['',Validators.required],
      balanceAmount : ['',Validators.required],
      date:  [this.today,Validators.required],
    
      
  });
}
 
  getbalance(){
    this.formStock.value.balanceAmount=this.formStock.value.sellingPrice-this.formStock.value.purchaseAmount
  return (this.formStock.value.balanceAmount)
  }

  initiatedtOption(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu:[10,20,30]
    };
  }
 

  showTable(){
    this.showUserForm=false;
    this.showUserTable=true;
    this.showUpdateButton = false;
    this.showAddButton = false;
  
  }
  view(data:any){
    this.api.getStockbyid(data._id)
    .subscribe(res=>{
      this.stockDetails=res
    })
  }
 
  getAllStock() {
    this.api.getStock().subscribe(res => {
      this.stockAll = res;
      
    })
  }

  showForm(){
    this.formStock = this.formbuilder.group({
      spare_name : ['',Validators.required],
      qnt  : ['',Validators.required],
      availqnt:['',Validators.required],
      purchaseAmount  : ['',Validators.required],
      sellingPrice  : ['',Validators.required],
      unitprice  : ['',Validators.required],
      balanceAmount : ['',Validators.required],
      date:  [this.today,Validators.required],
     
  })
    this.showUserForm=true
    this.showUpdateButton = false;
    this.showAddButton = true;
    this.showUserTable=false;
  }
 
  showFormupdate(){
    this.showUserForm=true
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.showUserTable=false;
}

  postStockDetails(){
    this.formStock.patchValue({
      availqnt: this.formStock.value.qnt,
      unitprice  : this.getperunit(),
      balanceAmount:this.getbalance()
    })
    console.log(this.formStock.value)    
    this.api.postStock(this.formStock.value).subscribe(res=>{
    alert("Stock Added Successfully!");
    this.formStock.reset();
    this.getAllStock()  
    this.showTable()
  },
  err => {
    if (err.status === 422) {
      this.serverErrorMessages = err.error.join('<br/>');
      alert(this.serverErrorMessages)
    }
    else
      this.serverErrorMessages = 'Something went wrong. Please contact admin.';
      alert(this.serverErrorMessages)
  })
}

deleteUsers(data:any){
  this.api.deleteStock(data._id)
  .subscribe(res=>{

    alert("Records Deleted Successfully!")
    this.initiatedtOption()
  this.getAllStock()
  this.showTable()
    
  })
}

onEdit(data:any){
  this.showUserTable=false
    this.showUserForm=true
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.updateId=data._id

  this.formStock.patchValue(data)
}

updateUsersDetails(){
  console.log(this.updateId);
  
  this.api.updateStock(this.formStock.value,this.updateId)
.subscribe((res: any)=>{
  console.log(res);
  
  alert("Record Updated Successfully!")
  this.formStock.reset();
  this.initiatedtOption()
  this.getAllStock()
  this.showTable()
})

}


getperunit(){
  this.formStock.value.unitprice=this.formStock.value.sellingPrice/this.formStock.value.qnt
  return (this.formStock.value.unitprice)
  }
 
}