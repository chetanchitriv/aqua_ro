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
    return this.http.post<any>(this.nodeUrl+"invoice", data)
  }

  getInvoice(){
    return this.http.get<any>(this.nodeUrl+"invoice")
  }
}