import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

 
  getNotification(){
    return this.http.get<any>(this.nodeUrl+"notification")
  }
  creatNoti(data:any){
    return this.http.post(this.nodeUrl+"notification",data)
  }
}
