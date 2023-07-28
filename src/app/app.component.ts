import { Component, Injector, ViewChild } from '@angular/core';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component'; 
import { SideBarComponent } from './components/common/side-bar/side-bar.component'; 
import { BaseComponent } from './components/common/base/base.component';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent
 {
  constructor(
    public authService: AuthService,
   ) {
  }
  @ViewChild('sidebar') sidebar: SideBarComponent | any;
  title = 'angular';
  open = false;
  isSpin = this.authService.isSpin;
  handleShowHideSideBar(){
    this.sidebar.open = this.open = !this.open;
  }
  handleLogout(){
    this.authService.doLogout();
  }
}
