import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../shared/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authservice:AuthserviceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token= localStorage.getItem('token')
      // if(!this.authservice.isLoggedIn()){
        if(token){
  //       const userRole = localStorage.getItem('role')
  //       if(route.data.role && route.data.role.indexOf(userRole) === -1){
  //         this.router.navigateByUrl('/login');
  //         // this.authservice.deleteToken();
  //         return false;        
  //     }
  //   return true;
  // this.router.navigateByUrl('/login');
  // this.authservice.deleteToken();
  // localStorage.removeItem('role')
  // localStorage.removeItem('username')
 
  return true; 
  }else{ 

  
  return false;}
 
}
}