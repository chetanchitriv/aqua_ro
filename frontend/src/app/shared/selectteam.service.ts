import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectTeamService {
  
  
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  

  constructor(private http : HttpClient) { }

  postTeams(data : any){
   
    return this.http.post<any>(this.nodeUrl+"teams", data)
  }
  
  getTeams(){
    return this.http.get<any>(this.nodeUrl+"teams")
  }
  updateTeams(data : any,id: number){
 
    return this.http.put<any>(this.nodeUrl+`teams/`+`${id}`,data)
   
  }
  deleteTeams(id : number){
   
    return this.http.delete<any>(this.nodeUrl+`teams/`+`${id}`)
    
  }
  getTeamsByMobile(mobile:number){
    return this.http.get(this.nodeUrl+`teams/`+`${mobile}`)
  }
  getTeamsbyid(id : number){
    
    return this.http.get<any>(this.nodeUrl+`teams/`+`${id}`)
    }
   

}