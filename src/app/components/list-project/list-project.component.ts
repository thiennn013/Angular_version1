import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Ultility } from 'src/app/service/ultility.service';
import { BaseComponent } from '../common/base/base.component';

@Component({
  selector: 'list-project',
  templateUrl: './list-project.component.html',
})
export class ListProjectComponent extends BaseComponent {
  override fnInit(isMenu: boolean) {
    this.DIVISION = 'wms';
    var request = {
      DIVISION: this.DIVISION,
      PROJECT_NAME: this.PROJECT_NAME,
    };
    this.apiService.post('list-project', request).subscribe({
      next: (response) => {
        if (response.listProject.length == 0) {
          alert('Khong co du lieu');
        }
        this.tableData = response.listProject;
      },
      error: (err) => {
        Ultility.fnSetErrorMsg(this, err.error.fatalError)
      },
    });
  }
  override fnDestroy() {}
  constructor(
    protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router
  ) {
    super(authService, apiService, router);
  }

  DIVISION: any = ' 1';
  PROJECT_NAME: any = '';
  tableData: any = [];
  DIVISIONMessage = '';

  handleSearch() {
    var request = {
      DIVISION: this.DIVISION,
      PROJECT_NAME: this.PROJECT_NAME,
    };
    this.apiService.post('list-project', request).subscribe({
      next: (response) => {
        if (response.listProject.length == 0) {
          alert('Khong co du lieu');
        }
        this.DIVISIONMessage = '';
        this.tableData = response.listProject;
      },
      error: (error) => Ultility.fnSetErrorMsg(this, error.error.fatalError),
    });
  }

  gotoProject(row: any) {
    this.router.navigate(['project', row.PROJECT_ID]);
  }

  handleClear() {
    this.DIVISION = '';
    this.DIVISIONMessage = '';
    this.PROJECT_NAME = '';
    this.tableData = '';
  }
}
