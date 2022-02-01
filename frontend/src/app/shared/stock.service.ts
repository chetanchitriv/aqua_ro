import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsersModel } from '../superadmin/users.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  dbUrl=environment.apiUrl
  nodeUrl=environment.nodeapiUrl
  getUsers: any;
  updateStockallot: any;
  

  constructor(private http : HttpClient) { }

  postStock(data : any){
    return this.http.post<any>(this.nodeUrl+"stock", data)
  }
  getStock(){
    return this.http.get<any>(this.nodeUrl+"stock")
  }
  updateStock(data : any,id: number){
    return this.http.put<any>(this.nodeUrl+`stock/`+`${id}`,data)
   
  }
  deleteStock(id : number){
    return this.http.delete<any>(this.nodeUrl+`stock/`+`${id}`)
    
  }

  getStockbyid(id : any){
    return this.http.get<any>(this.nodeUrl+`stock/`+`${id}`)
    }

}
