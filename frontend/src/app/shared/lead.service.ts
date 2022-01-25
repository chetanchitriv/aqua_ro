import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsersModel } from '../superadmin/users.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  
  
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  

  constructor(private http : HttpClient) { }

  postLeads(data : any){
    return this.http.post<any>(this.nodeUrl+"leads", data)
  }
  getLeads(){
    return this.http.get<any>(this.nodeUrl+"leads")
  }
  updateLeads(data : any,id: number){
    return this.http.put<any>(this.nodeUrl+`leads/`+`${id}`,data)
   
  }
  deleteLeads(id : number){
    return this.http.delete<any>(this.nodeUrl+`leads/`+`${id}`)
    
  }
  getLeadByMobile(mobile:number){
    return this.http.get(this.nodeUrl+`leads/`+`${mobile}`)
  }
  getLeadsbyid(id : number){
    
    return this.http.get<any>(this.nodeUrl+`leads/`+`${id}`)
    }

}