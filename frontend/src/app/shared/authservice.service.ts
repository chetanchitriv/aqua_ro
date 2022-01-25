import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

  Login(data : any){
    return this.http.post(this.nodeUrl+"login", data,this.noAuthHeader)
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setUserName(username: string) {
    localStorage.setItem('username',username);
  }
  setRole(role:string) {
    localStorage.setItem('role',role);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  deleteToken(){
    return localStorage.removeItem('token')
    
  }
  
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}