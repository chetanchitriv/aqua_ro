import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ComplaintService } from 'src/app/shared/complaint.service';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { LeadService } from 'src/app/shared/lead.service';
import { UserService } from 'src/app/shared/user.service';

import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  @ViewChild('pdfTable')
  pdfTable!: ElementRef;



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



  constructor(private formbuilder:FormBuilder, private leadService:LeadService, private api:ComplaintService, private userService: UserService, private invoiceService:InvoiceService) { }
  

  ngOnInit(): void {
    
this.future.setDate(this.future.getDate()+15)
console.log("dueDate", this.future);

  
    this.username=localStorage.getItem('username')
    this.initiatedtOption()
//  this.getAllInvoice()
    this.getAllUser()
    this.getAllLeads()
    this.getAllComplaints()
   
    
   
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
    

  }

  createItem(): FormGroup {
    return this.formbuilder.group({
      itemName: '',
      description: '',
      qnt: '',
      rate:'',
      amt: ''
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
  this.api.getInvoice().subscribe((res:any) => {
    this.invoiceAll = res;
    
  })
}
generateInvoice(){
  this.showinvoicesearchForm =false
  this.showinvoiceTable=false
  this.showinvoiceForm=false
  this.invoice=true
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
  this.showinvoicesearchForm =true
  this.showinvoiceTable=true
  this.showinvoiceForm=true
  this.invoice=false
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
    alert("Pdf Downloaded Succefully") 
  }
}
