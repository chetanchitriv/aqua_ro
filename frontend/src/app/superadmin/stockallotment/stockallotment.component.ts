import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stockallotment',
  templateUrl: './stockallotment.component.html',
  styleUrls: ['./stockallotment.component.css']
})
export class StockallotmentComponent implements OnInit {

  showstockForm: boolean= false;
  showstockTable: boolean=false;

  formStockAllot: any=FormGroup;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
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

