import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ComplaintService } from 'src/app/shared/complaint.service';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { LeadService } from 'src/app/shared/lead.service';
import { UserService } from 'src/app/shared/user.service';

import { jsPDF } from 'jspdf'
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

  isSuperAdmin: boolean = false
  isAdmin: boolean = false
  isTelecaller: boolean = false
  isTechnician: boolean = false

  dtOptions: DataTables.Settings = {}
  searchLead: any = FormGroup;
  allLeads: any = [];
  leadData: any = null;
  showinvoicesearchForm: boolean = false;
  showinvoiceForm: boolean = false;
  showinvoiceTable: boolean = false;
  showinvoiceUpdateForm: boolean = false

  date = new Date()

  today: any
  times: any
  future = new Date()
  dueDate: any


  invoiceForm: any = FormGroup;
  invoiceUpdateForm: any = FormGroup;
  complaintsAll: any = [];


  types = ["AMC", "Service type"]

  getAllComplaint: any;
  updateId: any;

  complaintDetails: any = {};
  usersAll: any = [];
  assigntoList: any = [];
  username: any
  itemList: any = FormArray;
  invoiceAll: any = [];
  invoicePdf: any = []
  items: any = []
  DATA: any
  newArray: any = []
  grandTotal: any
  tax: any
  basePrice: any
  invoice: boolean = false
  qnt: any;
  rate: any;
  in: any;
  stockallotAll: any = [];
  currentUser: any;
  stockAll: any = [];
  techname: any;
  qnty: any = []
  newStockallot: any = []
  unitRate: any = [];
  total: any;
  error: boolean = false;
  formStock: any = FormGroup;
  currentRole: any
  formStockAllot:any= FormGroup;
  techspareList: any=[];
  techqnty: any=[];

  constructor(private formbuilder: FormBuilder, private stockallservice: StockallotService, private stockinv: StockService, private leadService: LeadService, private api: ComplaintService, private userService: UserService, private invoiceService: InvoiceService) { }


  ngOnInit(): void {

     this.currentRole = localStorage.getItem("role")
     this.currentUser = localStorage.getItem("username")

    var Role = localStorage.getItem("role")
    if (Role == 'Superadmin') {
      this.isSuperAdmin = true
      this.isAdmin = false
      this.isTelecaller = false
      this.isTechnician = false

    }
    if (Role == 'Admin') {
      this.isSuperAdmin = false
      this.isAdmin = true
      this.isTelecaller = false
      this.isTechnician = false
    }
    if (Role == 'Technician') {
      this.isSuperAdmin = false
      this.isAdmin = false
      this.isTelecaller = false
      this.isTechnician = true
    }
    if (Role == 'Telecaller') {
      this.isSuperAdmin = false
      this.isAdmin = false
      this.isTelecaller = true
      this.isTechnician = false
    }


    this.future.setDate(this.future.getDate() + 15)
    console.log("dueDate", this.future);


    this.username = localStorage.getItem('username')
    this.initiatedtOption()
    //  this.getAllInvoice()

    this.getAllUser()
    this.getAllLeads()
    this.getAllStockallot()
    this.getAllComplaints()
    this.getAllInvoice()
    this.getAllStock()


    this.invoiceUpdateForm = this.formbuilder.group({
      name: ['', Validators.required],
      // mobileNo : ['',Validators.required],
      // AltmobileNo : [''],
      emailId: ['', Validators.required],
      // assignTo : ['',Validators.required],
      address: ['', Validators.required],
      serviceType: ['', Validators.required],
      date: [this.today, Validators.required],
      dueDate: [this.future, Validators.required],

      items: this.formbuilder.array([this.createItem()])
    })
    this.invoiceForm = this.formbuilder.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      address: ['', Validators.required],
      date: [this.today, Validators.required],
      dueDate: [this.dueDate, Validators.required],
      serviceType: ['', Validators.required],
      itemList: this.formbuilder.array([this.createItem()])
    })
    this.formStock = this.formbuilder.group({
      spare_name: ['', Validators.required],
      qnt: ['', Validators.required],
      availqnt: ['', Validators.required],
      purchaseAmount: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      balanceAmount: ['', Validators.required],
      date: ['', Validators.required],
    });
    
    this.formStockAllot = this.formbuilder.group({
      // spare_name : ['',Validators.required],
      // qnt  : ['',Validators.required],
      techname  : ['',Validators.required],
      date:  [this.today],
      itemList: this.formbuilder.array([ this.createspare() ])
     
  }); 
  }
  getamount(i: any) {
    this.invoiceForm.controls['itemList'].value.at(i).amt = this.invoiceForm.controls['itemList'].value.at(i).qnt * this.unitRate[i]
    return (this.invoiceForm.controls['itemList'].value.at(i).amt)
  }
  getbalanceQnty(i: any) {

    this.invoiceForm.controls['itemList'].value.at(i).qntdiff = this.qnty[i] - this.invoiceForm.controls['itemList'].value.at(i).qnt
    return (this.invoiceForm.controls['itemList'].value.at(i).qntdiff)

  }

  getTechbalanceQnty(i: any) {

    this.invoiceForm.controls['itemList'].value.at(i).qntdiff = this.techqnty[i] - this.invoiceForm.controls['itemList'].value.at(i).qnt
    return (this.invoiceForm.controls['itemList'].value.at(i).qntdiff)

  }

  createItem(): FormGroup {
    return this.formbuilder.group({
      itemName: '',
      description: '',
      qnt: '',
      unitprice: '',
      qntdiff: '',
      amt: ''
    });
  }

  createspare(): FormGroup {
    return this.formbuilder.group({
      spare_name: '',
      qntdiff:'',
      qnt:'',
      unitprice: '',
      technicianAvilQnt:''
    });

  }

  addItem(): void {
    this.itemList = this.invoiceForm.get('itemList') as FormArray;
    this.itemList.push(this.createItem());
  }

  removeItem(index: any): void {
    this.itemList.removeAt(index);
  }


  showSearchForm() {
    this.searchLead = this.formbuilder.group({

      mobile: ['', Validators.required]
    })
    this.showinvoicesearchForm = true
    this.showinvoiceForm = false
    this.showinvoiceTable = false
    this.showinvoiceUpdateForm = false
    this.invoice = false
  }

  getAllLeads() {
    this.leadService.getLeads().subscribe(res => {
      this.allLeads = res
      console.log(res);

    })
  }

  search() {
    var leadExist = false;
    console.log(this.searchLead.controls.mobile.value);

    this.today = this.date.toISOString().slice(0, 10);
    this.dueDate = this.future.toISOString().slice(0, 10);
    this.times = this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
    this.allLeads.forEach((element: any) => {
      if (element.mobileNo == this.searchLead.controls.mobile.value || element.AltmobileNo == this.searchLead.controls.mobile.value) {
        this.leadData = element


        leadExist = true
      }
    });

    if (leadExist) {
      this.techqnty=[]
      this.qnty=[]
      this.unitRate=[]
      this.showinvoicesearchForm = false;
      this.showinvoiceForm = true
      this.showinvoiceTable = false
      this.showinvoiceUpdateForm = false
      this.invoiceForm = this.formbuilder.group({
        name: [this.leadData.name, Validators.required],
        // mobileNo : [this.leadData.mobileNo,Validators.required],
        // AltmobileNo : [this.leadData.AltmobileNo,Validators.required],

        emailId: [this.leadData.emailId, Validators.required],
        // assignTo : [this.leadData.assignTo,Validators.required],
        address: [this.leadData.address, Validators.required],
        date: [this.today, Validators.required],
        dueDate: [this.dueDate, Validators.required],

        serviceType: ['', Validators.required],
        itemList: this.formbuilder.array([this.createItem()])
      })
      //   var arrayControl = this.invoiceForm.get('itemList') as FormArray;
      //   // console.log(arrayControl.value.at(2))
      //   var item = arrayControl.at(2);
      //  console.log(item);
      // console.log(this.invoiceForm.get('itemList.0.qnt').value);


    }

    else {
      alert("Lead does not exist with this number")
    }


  }

  initiatedtOption() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [10, 20, 30]
    };
  }


  showTable() {
    this.total = 0
    this.tax = 0
    this.grandTotal = 0
    this.showinvoiceForm = false
    this.showinvoiceTable = true
    this.showinvoiceUpdateForm = false
    this.showinvoicesearchForm = false
    this.invoice = false

  }

  view(data: any) {
    this.api.getComplaintsbyid(data._id)
      .subscribe(res => {
        this.complaintDetails = res
      })


  }

  getAllComplaints() {

    this.api.getComplaints().subscribe((res: any) => {
      this.complaintsAll = res;

    })
  }
  getAllStockallot() {
    this.stockallservice.getStockallot().subscribe((res: any) => {
      console.log(res, "ni");
      console.log(this.username, "user");

      this.stockallotAll = res.filter((a: any) => {

        return a.techname == this.username
      })
      console.log(this.stockallotAll);
      
      // console.log(this.stockallotAll[0].itemList.concat(this.stockallotAll[1].itemList),"kapya");
      // for (let x in this.stockallotAll) {
        this.stockallotAll.forEach((element:any) => {
          this.newStockallot=[]
          if(this.stockallotAll.length > 1){
            element.itemList.forEach((e:any) => {
              this.newStockallot.push(e)           
            })
          }
          else{
            element.itemList.forEach((e:any) => {
              this.newStockallot.push(e)           
            })
          }       
        });
        // this.newStockallot.forEach((element:any) => {
        //   this.techspareList.push(element.spare_name)
        // });
        console.log(this.newStockallot, "all");
        
    })
  }

  getAllStock() {
    this.stockinv.getStock().subscribe(res => {
      this.stockAll = res;

    })
  }

  getAllUser() {
    this.userService.getUsers().subscribe(res => {
      this.usersAll = res;
      this.usersAll.forEach((element: any) => {
        this.assigntoList.push(element.userName)
      });
    })
  }


  // generateInvoice(){

  // console.log(this.invoiceForm.value);
  // }

  getAllInvoice() {
    this.invoiceService.getInvoice().subscribe((res: any) => {
      this.invoiceAll = res;
      console.log(res, "invoices");


    })
  }
  generateInvoice() {
    this.newArray = []
    if (this.error === false) {
      this.invoiceService.postInvoice(this.invoiceForm.value).subscribe(res => {
        res.data.itemList.forEach((element: any) => {
          
          this.newArray.push(element.amt)
          this.total = this.getTotal(this.newArray)
          this.tax = this.total * 0.16
          this.grandTotal = this.total + this.tax
       
          if(this.currentRole == 'Superadmin' || 'Admin'){
          var test = this.findspare(element.itemName)
          this.formStock.patchValue(test)
          this.formStock.patchValue({
            availqnt: element.qntdiff,
          })
          this.stockinv.updateStock(this.formStock.value, test._id).subscribe((res: any) => {

          })
        }
          if(this.currentRole == 'Technician'){
            var allotedstockobj = this.findTechnician(this.currentUser)
            // var test = this.findallotedspare(allotedstockobj,element.itemName)
            this.formStockAllot.patchValue(allotedstockobj)
            var array=this.formStockAllot.controls.itemList.value
            console.log(allotedstockobj,this.formStockAllot.value,array);
            
            for (let x in array) {
             
                this.formStockAllot.controls['itemList'].value.at(x).technicianAvilQnt=element.qntdiff
              
            }
            // this.formStockAllot.patchValue({
            //   availqnt: element.qntdiff,
            // })
            this.stockallservice.updateStockallot(this.formStockAllot.value, allotedstockobj._id).subscribe((res: any) => {
  
            })
          }
        });        
        // var array = res.data.itemList
        this.invoicePdf = res.data
        this.items = res.data.itemList

        // for (let x in array) {
        //   this.newArray.push(this.invoiceForm.controls['itemList'].value.at(x).amt)
        //   this.total = this.getTotal(this.newArray)
        //   this.tax = this.total * 0.16
        //   this.grandTotal = this.total + this.tax
        // }
       
       
       
        this.showinvoicesearchForm = false
        this.showinvoiceTable = false
        this.showinvoiceForm = false
        this.invoice = true

      })

    }
    else {
      alert("Please enter a valid data");
    }
  }

  getTotal(newarray: any) {
    var sum = newarray.reduce((x: any, y: any) => x + y);
    return sum
  }
  findspare(sparename: any) {
    return this.stockAll.find((x: any) => x.spare_name === sparename);
  }

  findallotedspare(obj: any,sparename:any) {
    return obj.itemList.find((x: any) => x.spare_name === sparename);
  }
  findTechnician(username:any){
    return this.stockallotAll.find((x: any) =>x.techname === username)
  }
  // downloadPdf(base64String:any, fileName:any) {
  //   const source = `data:application/pdf;base64,${base64String}`;
  //   const link = document.createElement("a");
  //   link.href = source;
  //   link.download = `${fileName}.pdf`
  //   link.click();
  // }


  public openPDF(): void {
    this.showinvoicesearchForm = false
    this.showinvoiceTable = false
    this.showinvoiceForm = false
    this.invoice = true
    this.DATA = document.getElementById('htmlData');

    html2canvas(this.DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save(this.leadData.name + '_' + this.today);
    });
    // alert("Pdf Downloaded Succefully") 
  }

  viewinvoice(item: any) {
    this.newArray = []
    this.invoicePdf = item
    this.items = item.itemList
    this.invoice = true
    this.showinvoiceTable = false

    var array = item.itemList

    for (let x in array) {
      this.total = 0
      this.tax = 0
      this.grandTotal = 0
      this.newArray.push(array[x].amt)
      // array[x].amt = amt
      this.total = this.getTotal(this.newArray)
      this.tax = this.total * 0.16
      this.grandTotal = this.total + this.tax

    }


  }

  // print(){
  //   window.print()
  //    this.in=document.getElementById("htmlData");
  //   this.in.print();
  // }

  selectSpare(e: any, i: any) {
    var spare = e.target.value
   
    console.log(e.target.value, "newall");
    const array = spare.split(": ");
    console.log(array, "jaduuuuu");

    var sparename = array[1]
   
    // console.log(this.stockallotAll[0].itemList.concat(this.stockallotAll[1].itemList), "heyyyyy");
  

    var sparedata = this.newStockallot.find((x: any) => (x.spare_name == sparename) );
    var sparedatatech = this.stockAll.find((x: any) => (x.spare_name == sparename));


    console.log(sparedata, "techn");

    this.techqnty[i] = sparedata.technicianAvilQnt
    this.unitRate[i] = sparedatatech.unitprice

    return (this.techqnty[i], this.unitRate[i])

  }


  selectSpare1(e: any, i: any) {
    var spare = e.target.value
    console.log(e.target.value, "k");

    // const array=spare.split(": ");
    var sparename = e.target.value


    const sparedata = this.stockAll.find((x: any) => x.spare_name == sparename);


    console.log(sparedata, "he");

    this.qnty[i] = sparedata.availqnt
    this.unitRate[i] = sparedata.unitprice
    return (this.qnty[i], this.unitRate[i])
  }

  Checkqnt(i: any, e: any) {

    var quantity = e.target.value
    if (quantity > this.qnty[i]) {
      this.error = true;
    } else {
      this.error = false
    }
    return this.error
  }

  CheckTechqnt(i: any, e: any) {

    var quantity = e.target.value
    if (quantity > this.techqnty[i]) {
      this.error = true;
    } else {
      this.error = false
    }
    return this.error
  }

}


