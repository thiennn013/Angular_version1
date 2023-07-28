import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  @Input() name: any = "";
  @Input() role: any = "";
  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }
  goToDashboard(){
    this.router.navigate(['dashboard'])
  }
  public open = false;
}
