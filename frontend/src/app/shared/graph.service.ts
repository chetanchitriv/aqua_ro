import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

  getLeadBytelecaller(){
    return this.http.get<any>(this.nodeUrl+"graph/telecaller")
  }
  getLeadBytechnician(){
    return this.http.get<any>(this.nodeUrl+"graph/technician")
  }
}
