import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate()
    {
      var Role= localStorage.getItem("role")
      if(Role == 'Superadmin' || Role == 'Admin' ){
        return true;
      }else{
        alert("You are not autharised ")
        return false
      }
    
  }
  
}
