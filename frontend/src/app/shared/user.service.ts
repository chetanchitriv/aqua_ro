import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsersModel } from '../superadmin/users.model';
import { environment } from 'src/environments/environment';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    [x: string]: any;
  
    get nativeWindow() : any {
      return _window();
   }

  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

  postUsers(data : any){
    return this.http.post<any>(this.nodeUrl+"users", data)
  }
  getUsers(){
    return this.http.get<any>(this.nodeUrl+"users")
  }
  updateUsers(data : any,id: number){
    return this.http.put(this.nodeUrl+`users/`+`${id}`,data)
  }
  deleteUsers(id : number){
    return this.http.delete<any>(this.nodeUrl+`users/`+`${id}`)
    }

  getUsersbyid(id : any){
    return this.http.get<any>(this.nodeUrl+`users/`+`${id}`)
    }
   //change password
   updatepassword(data : any,id: number){
    return this.http.put<any>(this.nodeUrl+`users/changepassword/`+`${id}`,data)
  }
  
}
