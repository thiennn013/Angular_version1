import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Ultility } from 'src/app/service/ultility.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  constructor(
    protected authService: AuthService,
    protected router: Router,
    private httpClient: HttpClient
  ) {
    if (authService.isLoggedIn) {
      router.navigate(['greeting']);
    }
  }

  @ViewChild('usernameInp') usernameInp!: ElementRef 
  ngOnInit(): void {
    this.usernameInp.nativeElement.focus();
  }
  usernameMessage = '';
  passwordMessage = '';
  wrongMessage = '';
  project: any;
  projectMessage = '';
  username: string = '';
  password: string = '';
  listproject: any = [];
  handleFocusOutUsername() {
    this.usernameMessage = '';
    this.projectMessage = '';
    this.httpClient
      .post('http://localhost:8023/list-mini-project', {
        username: this.username,
      })
      .subscribe({
        next: (res: any) => {
          this.listproject = res.rows;
          this.project = this.listproject[0].PROJECT_ID;
        },
        error: (err) => {
          Ultility.fnSetErrorMsg(this, err.error.fatalError);
        },
      });
  }
  handleBtnLoginClick() {
    var user = {
      username: this.username,
      project: this.project,
      password: this.password,
    };
    localStorage.setItem('IdPrj',this.project)
    this.authService.signIn(this, user);
  }
}
