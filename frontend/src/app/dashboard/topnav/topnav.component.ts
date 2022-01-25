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

  constructor(private authservice: AuthserviceService, private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }
  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    this.authservice.deleteToken();
    this.router.navigate(['/login']);
  }

}
