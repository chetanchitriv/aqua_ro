import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockallotService {
 
  

  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
 

  constructor(private http : HttpClient) { }

  postStockallot(data : any){
    return this.http.post<any>(this.nodeUrl+"stocktech", data)
  }

  getStockallot(){
    return this.http.get<any>(this.nodeUrl+"stocktech")
  
  }

}
