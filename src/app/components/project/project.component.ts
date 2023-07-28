import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import * as Const from '../../common/Const';
import { BaseComponent } from '../common/base/base.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent extends BaseComponent {
  constructor(
    private route: ActivatedRoute,
    protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router
  ) {
    super(authService, apiService, router);
  }
  project: any = {};
  override fnInit(isMenu: boolean) {
    this.apiService.post(Const.projectWs, {}).subscribe({
      next: (res) => (this.project = res),
    });
  }
  override fnDestroy() {}

  goTo(url: string) {
    this.router.navigate([url], {
      state: this.project,
    });
  }
}
