import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsersModel } from '../superadmin/users.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  
  constructor(private http : HttpClient) { }

  postUsers(data : any){
    return this.http.post<any>(this.dbUrl+"users", data)
  }
  getUsers(){
    return this.http.get<any>(this.dbUrl+"users")
  }
  updateUsers(data : any,id: number){
    return this.http.put<any>(this.dbUrl+`users/`+`${id}`,data)
  }
  deleteUsers(id : number){
    return this.http.delete<any>(this.dbUrl+`users/`+`${id}`)
    }

  getUsersbyid(id : any){
    return this.http.get<any>(this.dbUrl+`users/`+`${id}`)
    }
}
