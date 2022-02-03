import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl


  constructor(private http : HttpClient) { }

  postInvoice(data : any){
    // return this.http.post<any>(this.nodeUrl+"invoice", data)
    return this.http.post<any>("http://391e-43-224-0-173.ngrok.io/api/invoice", data)

  }

  getInvoice(){
    // return this.http.get<any>(this.nodeUrl+"invoice")
  }
}