import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IObjectString } from 'src/app/common/IObject';
import * as Const from '../../../common/Const';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { Ultility } from 'src/app/service/ultility.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  constructor(
    protected authService: AuthService,
    protected apiService: ApiService,
    protected router: Router,
  ) {

  }

  /**
   * エラーメッセージ
   */
  errorMessage: IObjectString = {};

  /**
   * 画面項目名のリスト
   */
  formItemNm: IObjectString = {};

  /**
   * 画面項目名のリスト
   */
  defaultvalue: IObjectString = {};

  /**
   * Thực hiện các khởi tạo
   */
  ngOnInit(): void {
    this.fnInit(false);
  }

  /**
   * 画面から離れる時呼び出される
   */
  ngOnDestroy(): void {
    this.fnDestroy();
  }


  /**
   * 初期化処理。
   * メニューからの再表示の際も呼び出される
   * @param isMenu メニューアイテムがクリックされた場合true
   */
  abstract fnInit(isMenu: boolean): any;

  /**
   * 画面から離れる時の処理
   */
  abstract fnDestroy(): any;
}
