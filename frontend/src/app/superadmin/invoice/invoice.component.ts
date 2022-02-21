import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ComplaintService } from 'src/app/shared/complaint.service';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { LeadService } from 'src/app/shared/lead.service';
import { UserService } from 'src/app/shared/user.service';

import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';
import { StockallotService } from 'src/app/shared/stockallot.service';
import { StockService } from 'src/app/shared/stock.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  isSuperAdmin :boolean = false
  isAdmin :boolean = false
  isTelecaller :boolean = false
  isTechnician :boolean = false

  dtOptions:DataTables.Settings={}
  searchLead: any=FormGroup;
  allLeads: any=[];
  leadData: any=null;
  showinvoicesearchForm: boolean=false;
  showinvoiceForm: boolean=false;
  showinvoiceTable:boolean=false; 
  showinvoiceUpdateForm:boolean=false

  date = new Date()

  today:any
  times:any
future= new Date()
dueDate:any


  invoiceForm: any = FormGroup;
  invoiceUpdateForm: any = FormGroup;
  complaintsAll: any=[];

 
  types=["AMC","Service type"]
  
  getAllComplaint: any;
  updateId: any;

  complaintDetails: any={};
  usersAll: any=[];
  assigntoList: any=[];
  username:any
  itemList: any= FormArray;
  invoiceAll: any=[];
  invoicePdf:any=[]
  items:any=[]
  DATA:any
  newArray:any=[]
  grandTotal:any=Number
  tax:any
  basePrice:any
  invoice:boolean=false
  qnt: any;
  rate: any;
  in: any;
  stockallotAll: any=[];
  currentUser: any;
  stockAll: any=[];
  techname: any;



  constructor(private formbuilder:FormBuilder, private stockallservice:StockallotService, private stockinv: StockService, private leadService:LeadService, private api:ComplaintService, private userService: UserService, private invoiceService:InvoiceService) { }
  

  ngOnInit(): void {

   
   
    var Role= localStorage.getItem("role")
    if (Role=='Superadmin'){
      this.isSuperAdmin = true
      this.isAdmin =false
      this.isTelecaller=  false
      this.isTechnician = false
    
    }
    if (Role=='Admin'){
      this.isSuperAdmin = false
      this.isAdmin =true
      this.isTelecaller=  false
      this.isTechnician = false
    }
    if (Role=='Technician'){
      this.isSuperAdmin = false
      this.isAdmin =false
      this.isTelecaller=  false
      this.isTechnician = true
    }
    if (Role=='Telecaller'){
      this.isSuperAdmin = false
      this.isAdmin =false
      this.isTelecaller=  true
      this.isTechnician = false
    }

   
this.future.setDate(this.future.getDate()+15)
console.log("dueDate", this.future);

  
    this.username=localStorage.getItem('username')
    this.initiatedtOption()
//  this.getAllInvoice()

    this.getAllUser()
    this.getAllLeads()
    this.getAllStockallot()
    this.getAllComplaints()
    this.getAllInvoice()
    this.getAllStock() 
    
   
    this.invoiceUpdateForm = this.formbuilder.group({
      name : ['',Validators.required],
      // mobileNo : ['',Validators.required],
      // AltmobileNo : [''],
      emailId : ['',Validators.required],
      // assignTo : ['',Validators.required],
      address : ['',Validators.required],
      serviceType : ['',Validators.required],
      date : [this.today,Validators.required],
      dueDate : [this.future,Validators.required],

      items: this.formbuilder.array([ this.createItem() ])
      
      // followUpmode : ['Call',Validators.required],
      // followUpdate : ['',Validators.required],
      // followUptime : ['',Validators.required],
      // comment : ['',Validators.required],
      // nextFollowupdate : ['',Validators.required],
      // nextFollowuptime : ['',Validators.required],
      // complaintInfo:['',Validators.required],
      // complaintDate:[this.today,Validators.required],
      // createdBy:[this.username,Validators.required],
    
      
    })
    this.invoiceForm = this.formbuilder.group({
      name : ['',Validators.required],
      // mobileNo : [this.leadData.mobileNo,Validators.required],
      // AltmobileNo : [this.leadData.AltmobileNo,Validators.required],
     
      emailId : ['',Validators.required],
      // assignTo : [this.leadData.assignTo,Validators.required],
      address : ['',Validators.required],
      date : [this.today,Validators.required],
      dueDate : [this.dueDate,Validators.required],

      serviceType:['',Validators.required],
      itemList: this.formbuilder.array([ this.createItem() ])
    })

  }
    getamount(i:any){
      this.invoiceForm.controls['itemList'].value.at(i).amt=this.invoiceForm.controls['itemList'].value.at(i).qnt*this.invoiceForm.controls['itemList'].value.at(i).rate
    return (this.invoiceForm.controls['itemList'].value.at(i).amt)
    }
    

  createItem(): FormGroup {
    return this.formbuilder.group({
      itemName: '',
      description: '',
      qnt:0,
      rate:0,
      amt:0
    });
  }
    

  addItem(): void {
    this.itemList = this.invoiceForm.get('itemList') as FormArray;
    this.itemList.push(this.createItem());
  }

  removeItem(index: any): void
   { this.itemList.removeAt(index); 
  }
 
    
  showSearchForm(){
    this.searchLead = this.formbuilder.group({
   
      mobile : ['',Validators.required]
    })
      this.showinvoicesearchForm=true
      this.showinvoiceForm=false
      this.showinvoiceTable=false
      this.showinvoiceUpdateForm=false
      this.invoice=false
  }

  getAllLeads(){
    this.leadService.getLeads().subscribe(res=>{
      this.allLeads=res
      console.log(res);
      
    })
  }  

  search(){
    var leadExist=false;
    console.log(this.searchLead.controls.mobile.value);
    
    this.today = this.date.toISOString().slice(0, 10);
    this.dueDate = this.future.toISOString().slice(0, 10);
    this.times =  this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
    this.allLeads.forEach((element:any )=> {
      if(element.mobileNo==this.searchLead.controls.mobile.value || element.AltmobileNo==this.searchLead.controls.mobile.value){
        this.leadData=element
    
        
        leadExist=true
      }
    });
    
    if(leadExist){
      this.showinvoicesearchForm=false;
      this.showinvoiceForm=true
      this.showinvoiceTable=false
      this.showinvoiceUpdateForm=false
      this.invoiceForm = this.formbuilder.group({
        name : [this.leadData.name,Validators.required],
        // mobileNo : [this.leadData.mobileNo,Validators.required],
        // AltmobileNo : [this.leadData.AltmobileNo,Validators.required],
       
        emailId : [this.leadData.emailId,Validators.required],
        // assignTo : [this.leadData.assignTo,Validators.required],
        address : [this.leadData.address,Validators.required],
        date : [this.today,Validators.required],
        dueDate : [this.dueDate,Validators.required],
  
        serviceType:['',Validators.required],
        itemList: this.formbuilder.array([ this.createItem() ])
      })
    //   var arrayControl = this.invoiceForm.get('itemList') as FormArray;
    //   // console.log(arrayControl.value.at(2))
    //   var item = arrayControl.at(2);
    //  console.log(item);
    // console.log(this.invoiceForm.get('itemList.0.qnt').value);
    
     
    }
  
    else{
      alert("Lead does not exist with this number")
    }
    
   
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
    this.showinvoiceForm=false
    this.showinvoiceTable=true
    this.showinvoiceUpdateForm=false
    this.showinvoicesearchForm=false
    this.invoice=false
    
  }

  view(data:any){
    this.api.getComplaintsbyid(data._id)
    .subscribe(res=>{
      this.complaintDetails=res
    })

    
  }

getAllComplaints(){

  this.api.getComplaints().subscribe((res: any)=>{
  this.complaintsAll = res;
  
  })
}
getAllStockallot(){
  this.stockallservice.getStockallot().subscribe((res: any) => {
 console.log(res, "ni");
    console.log(this.username, "user");
    
    this.stockallotAll = res.filter((a: any) => {
      return a.techname == this.username
    })
    
    
    
})

  }  
  getAllStock() {
    this.stockinv.getStock().subscribe(res => {
      this.stockAll = res;
      
    })
  } 
  getcurrentUser() {
    return localStorage.getItem('currentUser')
  } 

  getAllUser(){
    this.userService.getUsers().subscribe(res=>{
      this.usersAll = res;
      this.usersAll.forEach((element:any) => {
        this.assigntoList.push(element.userName)
      });
      })
}


// generateInvoice(){

// console.log(this.invoiceForm.value);
// }

getAllInvoice() {
  this.invoiceService.getInvoice().subscribe((res:any) => {
    this.invoiceAll = res;
    console.log(res,"invoices");
    
    
  })
}
generateInvoice(){
  
    this.invoiceService.postInvoice(this.invoiceForm.value).subscribe((res: any)=>{
      console.log(res.data,"post res");
      console.log(res.data.itemList);
      
var array=res.data.itemList

      for (let x in array) {

        // console.log((array[x].qnt) * (array[x].rate));
        var amt = (array[x].qnt) * (array[x].rate)
        this.newArray.push(amt)
            // array[x].amt = amt
    
    }
      
    function sum(sahil:any, shank:any) {
      return sahil + shank
  }
  
  this.grandTotal = this.newArray.reduce(sum)
  this.tax = this.grandTotal* 0.16
  this.basePrice =this.grandTotal*0.84
  
      console.log(this.grandTotal,"jadu jadu");
      
this.invoicePdf=res.data
this.items=res.data.itemList


      // this.showinvoicesearchForm=false
      // this.showinvoiceTable=true
      // this.showinvoiceForm=false
      // this.showinvoiceUpdateForm=false
      alert("Invoice Generated Successfully!");
      this.showinvoicesearchForm =false
  this.showinvoiceTable=false
  this.showinvoiceForm=false
  this.invoice=true
      // this.downloadPdf(res.pdf,"invoice")
      // this.getAllInvoice();
    },
      (  err: any)=>{
      alert("Something Went Wrong!")
    })
}

// downloadPdf(base64String:any, fileName:any) {
//   const source = `data:application/pdf;base64,${base64String}`;
//   const link = document.createElement("a");
//   link.href = source;
//   link.download = `${fileName}.pdf`
//   link.click();
// }


public openPDF():void {
  this.showinvoicesearchForm =false
  this.showinvoiceTable=false
  this.showinvoiceForm=false
  this.invoice=true
    this.DATA = document.getElementById('htmlData');
      
    html2canvas(this.DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save(this.leadData.name+ '_'+this.today );
    });    
    // alert("Pdf Downloaded Succefully") 
  }

viewinvoice(item:any){

    this.invoicePdf=item
    this.items=item.itemList
    this.invoice=true
    this.showinvoiceTable=false

    var array=item.itemList

      for (let x in array) {

        // console.log((array[x].qnt) * (array[x].rate));
        var amt = (array[x].qnt) * (array[x].rate)
        this.newArray.push(amt)
            // array[x].amt = amt
    
    }
      
    function sum(sahil:any, shank:any) {
      return sahil + shank
  }
  
  this.grandTotal = this.newArray.reduce(sum)
  this.tax = this.grandTotal* 0.16
  this.basePrice =this.grandTotal*0.84
  
  }

  // print(){
  //   window.print()
  //    this.in=document.getElementById("htmlData");
  //   this.in.print();
  // }

 Nisha(){
   console.log(this.stockallotAll, "sahil");
   
 }

}
