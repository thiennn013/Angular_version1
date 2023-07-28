import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent{
  constructor(
    protected loginInfo: AuthService,
  ){
  }
  handleLogout(){
    console.log("a")
    this.loginInfo.doLogout();
  }
}
