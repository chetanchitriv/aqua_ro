import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/shared/authservice.service';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  username: any

  constructor(private authservice: AuthserviceService, private router:Router) { 
    this.username=localStorage.getItem('username')
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    this.authservice.deleteToken();
    this.router.navigate(['/login']);
  }

}
