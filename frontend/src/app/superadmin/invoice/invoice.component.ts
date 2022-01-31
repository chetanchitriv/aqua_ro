import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  searchLead: any=FormGroup;
  showsearchform: boolean=false;
  showInvoiceForm: boolean= false;
  showInvoiceTable: boolean=false;
  leadData: any;
  allLeads: any;
  today: any;
  times: any;
  date: any;
 

  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {

  }
  
  showSearchForm() {
    this.searchLead = this.formbuilder.group({
   
      mobile : ['',Validators.required]
    })
      this.showsearchform=true
      this.showInvoiceForm=false
      this.showInvoiceTable=false
     
  }
  

  showTable(){

  }

  search(){
    {
      var leadExist=false;
      console.log(this.searchLead.controls.mobile.value);
      
      this.today = this.date.toISOString().slice(0, 10);
      this.times =  this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
      this.allLeads.forEach((element:any )=> {
        if(element.mobileNo==this.searchLead.controls.mobile.value || element.AltmobileNo==this.searchLead.controls.mobile.value){
          this.leadData=element
          leadExist=true
  }
      
});

if(leadExist){
  this.showsearchform=false;
  this.showInvoiceForm=true
  this.showInvoiceTable=false
  

}  }}}
