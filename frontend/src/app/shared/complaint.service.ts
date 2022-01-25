import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

  postComplaints(data : any){
    return this.http.post<any>(this.nodeUrl+"complaints", data)
  }
  getComplaints(){
    return this.http.get<any>(this.nodeUrl+"complaints")
  }
  updateComplaints(data : any,id: number){
    return this.http.put<any>(this.nodeUrl+`complaints/`+`${id}`,data)
  }
  deleteComplaints(id : number){
    return this.http.delete<any>(this.nodeUrl+`complaints/`+`${id}`)
    }

    getComplaintsbyid(id : number){
      return this.http.get<any>(this.nodeUrl+`complaints/`+`${id}`)
      }
}
