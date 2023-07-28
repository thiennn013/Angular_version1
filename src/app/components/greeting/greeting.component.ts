import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { BaseComponent } from '../common/base/base.component';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
})
export class GreetingComponent extends BaseComponent {
  override fnInit(isMenu: boolean) {}
  override fnDestroy() {}
  constructor(
    protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router
  ) {
    super(authService, apiService, router);
  }
  name = '';
  greeting = '';
  click() {
    var request = {
      name: this.name,
    };
    this.apiService
      .post(`greeting`, { name: this.name })
      .subscribe({ next: (response) => (this.greeting = response.name) });
  }
}
