import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  showAddButton: boolean=false;
  showUpdateButton: boolean=false;

  formStockAllot: any=FormGroup;
  stockAll: any=[]
  usersAll: any;
  itemList: any= FormArray;
 date = new Date()
  today: any
  times: any
  stockData: any;
  stockallotAll: any=[];
  updateId: any;
  stockallotDetails: any={};
  qnty: any;
 
 

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
      // spare_name : ['',Validators.required],
      // qnt  : ['',Validators.required],
      techname  : ['',Validators.required],
      date:  [this.today],
      itemList: this.formbuilder.array([ this.createItem() ])
     
  });

  }
  createItem(): FormGroup {
    return this.formbuilder.group({
      spare_name: '',
      totalqnt:0,
      qntdiff:0,
     qnt:0,
   
    });

  }

  addItem(): void {
    this.itemList = this.formStockAllot.get('itemList') as FormArray;
    this.itemList.push(this.createItem());
  }

  removeItem(index: any): void
   { this.itemList.removeAt(index); 
  }
 

  
  getAllStockallot(){
    this.stockallotservice.getStockallot().subscribe((res: any) => {
      this.stockallotAll = res;    
      console.log(res,"niya");
      
  })
  }
  getamount(i:any){

    this.formStockAllot.controls['itemList'].value.at(i).qntdiff=this.formStockAllot.controls['itemList'].value.at(i).totalqnt-this.formStockAllot.controls['itemList'].value.at(i).qnt
  return (this.formStockAllot.controls['itemList'].value.at(i).qntdiff)
  }

postStockallotDetails(){
  this.stockallotservice.postStockallot(this.formStockAllot.value).subscribe(res=>{
    alert("Stock Added Successfully!");
    this.formStockAllot.reset();
    this.initiatedtOption()
  this.getAllStockallot()
  this.showStockTable()
  })

}
view(data:any){
  this.stockallotservice.getStockallotbyid(data._id)
  .subscribe(res=>{
    this.stockallotDetails=res
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
      deleteStockallot(data:any){
        this.stockallotservice.deleteStockallot(data._id)
        .subscribe(res=>{
      
          alert("Records Deleted Successfully!")
       
          this.initiatedtOption()
          this.getAllStockallot()
        this.showStockTable()
          
        })
      }
      
      onEdit(data:any){
        this.showstockTable=false
          this.showstockForm=true
          this.showUpdateButton = true;
          this.showAddButton = false;
          this.updateId=data._id
      
        this.formStockAllot.patchValue(data)
        
      }
    
      
      updateStockallotDetails(){
        console.log(this.updateId);
        
        this.stockallotservice.updateStockallot(this.formStockAllot.value,this.updateId)
      .subscribe((res: any)=>{
        console.log(res);
        
        alert("Record Updated Successfully!")
        this.formStockAllot.reset();
        this.initiatedtOption()
        this.getAllStockallot()
        this.showStockTable()
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
    this.formStockAllot = this.formbuilder.group({
      // spare_name : ['',Validators.required],
      // qnt  : ['',Validators.required],
      techname  : ['',Validators.required],
      date:  [this.today],
      itemList: this.formbuilder.array([ this.createItem() ])
     
  });
    this.showstockForm=true;
    this.showstockTable=false;
    this.showAddButton = true;
    this.showUpdateButton = false;
   

  }
  showStockTable(){
    this.showstockForm=false;
    this.showstockTable=true;
    this.showAddButton = false;
    this.showUpdateButton=false;

  }
  showFormupdate(){
    this.showstockForm=true
    this.showUpdateButton = true;
    this.showAddButton = false;
    this.showstockTable=false;
}
getSum(itemlist:any=[]){ 
  var sum=0;
  var a:any=[]
  itemlist.forEach((element:any) => {
     a.push(element.qnt)
  }); 
  for(var i in a) { 
      sum += a[i];
  }
  return sum;
}

selectSpare(e:any,i:any){
var spare=e.target.value
console.log(e.target.value);
const array=spare.split(": ");
var sparename=array[1]
console.log(sparename);
const sparedata=this.stockAll.find((x:any) => x.spare_name == sparename);
var qnty=sparedata.qnt
this.formStockAllot.controls['itemList'].value.at(i).totalqnt=qnty
this.formStockAllot.controls['itemList'].value.at(i).totalqnt

}
getTotalQnt(i:any){ 
  return this.formStockAllot.controls['itemList'].value.at(i).totalqnt

}


}

