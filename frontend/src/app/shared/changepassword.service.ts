import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

  postChangepassword(data : any){
    return this.http.post<any>(this.nodeUrl+"password", data)
  }
  getChangepassword(){
    return this.http.get<any>(this.nodeUrl+"password")
  }
  updateChangepassword(data : any,id: number){
    return this.http.put<any>(this.nodeUrl+`password/`+`${id}`,data)
  }
  deletePassword(id : number){
    return this.http.delete<any>(this.nodeUrl+`password/`+`${id}`)
    }

  getPasswordbyid(id : any){
    return this.http.get<any>(this.nodeUrl+`password/`+`${id}`)
    }
}
