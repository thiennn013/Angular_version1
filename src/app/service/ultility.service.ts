import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import * as Const from '../common/Const';
import { Router } from '@angular/router';

export class MessageDto {
  message = "";
  popupType = "";
}

//画面項目IDと項目名
export class FormItemInfoDto {
  formItemId = "";
  formItemNm = "";
}

@Injectable({
  providedIn: 'root'
})
export class Ultility {
  constructor() {}
  /**
   * 入力エラーをセットする(コントロールのエラー)
   */
  public static fnSetErrorMsg(component: any, errors: any) {
    let ret = false;

    if (errors != undefined) {
      errors.forEach((x: { controlID: string | undefined; errMsg: any; }) => {
        if (x.controlID != '' && x.controlID != undefined) {
          component[x.controlID + 'Message'] = x.errMsg;
          component.errorMessage[x.controlID] = x.errMsg;
          ret = true;
        }
        // ret = true;
      });
    }
    return ret;
  }

  /**
 * 入力エラーをセットする(コントロール以外のエラー)
 */
  public static fnSetErrorNoControl(component: any, errors: any){
    var ret = false;
    var msg = [];

    if(errors.length != 0){
      for (let i = 0; i < errors.length; i++) {
        if(errors[i].controlID == "" || errors[i].controlID == undefined) {
          msg.push({"str":errors[i].errMsg});
          ret = true;
        }
      }
    }
    component.messages = msg;
    return ret;
  }

  /**
   * 数字をカンマ区切りにする
   */
  public static fnFormatNumber(num: string | null | undefined): string {

    if (num === undefined || num === null || num === '') {
      return '';
    }

    const val = this.fnRemoveSeparater('' + num);
    return val.replace(/^(-?[0-9]+)(?=\.|$)/, function (s) { return s.replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,'); });
  }

  public static fnFormatDate(dateStr: string | null | undefined): string {

    if (dateStr === undefined || dateStr === null || dateStr.trim() === '') {
      return '';
    }

    return formatDate(dateStr, Const.dateFormat, Const.locale);
  }

  /**
   * カンマを取り除く
   */
  public static fnRemoveSeparater(numStr: string): string {
    if(numStr == '' || numStr == undefined || Number.isNaN(numStr)){
      return numStr;
    }else{
      if (typeof numStr.replace == 'function') {
        return numStr.replace(/\,/g, '');
      }else{
        return numStr;
      }
    }
  }

  /**
 * 変更があったかをチェック
 * @param initObj      // 初期値
 * @param obj        // 今の値
 * @returns true(変更あり)
 */
  public static fnCheckChange(initObj: { [x: string]: string; }, obj: { [x: string]: string; }): boolean {
    let initVal = '';
    let val = '';
    const members = Object.keys(initObj);

    for (let i = 0; i < members.length; i++) {
      const key = members[i];
      initVal = initObj[key];
      val = obj[key];

      // console.log(initVal + "::" + val);
      if (initVal != val) {
        return true;
      }
    }
    return false;
  }

  /**
 * 文字列を切り取る
 * @param str        文字列
 * @param num      切り取るバイト数
 */
  public static fnCutStr(str: string, num: number): string {

    if (str == '' || str == undefined) {
      return '';
    }

    let len = 0;
    const estr = escape(str);
    let ostr = '';
    for (let i = 0; i < estr.length; i++) {
      len++;
      ostr = ostr + estr.charAt(i);

      if (estr.charAt(i) == '%') {
        i++;
        ostr = ostr + estr.charAt(i);

        if (estr.charAt(i) == 'u') {
          ostr = ostr + estr.charAt(i + 1) + estr.charAt(i + 2) + estr.charAt(i + 3) + estr.charAt(i + 4);
          i += 4;
          len++;
        }
      }
      if (len >= num - 3) {
        return unescape(ostr);
      }
    }
    return unescape(ostr);
  }

  /**
 * ファイルパスからファイル名を取得
 */
  public static fnGetFileName(filePath: String) {
    return filePath.split('\\').pop();
  }

  /**
 * 遷移元のオブジェクトを破棄する。
 * 遷移元と遷移先が同じであれば、遷移元の初期化処理を実施する
 */
  public static fnDestoryObject(component: any, dispId: String, toDispId: String) {
    switch (toDispId) {
      case 'SPSE00101':
        //Spse00101InfoService.initFlg = true;
        break;
      case 'SPSE00201':
        //Spse00201InfoService.initFlg = true;
        break;
      case 'SPSE00601':
        //Spse00601InfoService.initFlg = true;
        break;
      case 'SPIN00101':
        //Spin00101InfoService.initFlg = true;
        break;
    }

    // 遷移元と遷移先が同じなら、初期化メソッドをコール
    if (dispId == toDispId && component.fnInitFromMenu) {
      component.fnInitFromMenu();
    }

  }

  /**
 * 日付を「yyyyMMddHHmmssSSS」型に変更
 */
  public static fnGetOpeDateTimeStr(opeDateTime: string): string {

    let ret = opeDateTime;
    ret = ret.replace(/-/g, '');
    ret = ret.replace(/\//g, '');
    ret = ret.replace(/\./g, '');
    ret = ret.replace(/:/g, '');
    ret = ret.replace(/ /g, '');

    return ret;
  }
  /**
   * HTMLエスケープを行う。
   */
  public static fnEscapeHtml(str: string): string {
    if (str !== undefined && Object.prototype.toString.call(str).slice(8, -1) == 'String') {
      str = str.replace(/&/g, '&amp;');
      str = str.replace(/</g, '&lt;');
      str = str.replace(/>/g, '&gt;');
      str = str.replace(/"/g, '&quot;');
      str = str.replace(/'/g, '&#39;');
      str = str.replace(/{/g, '&#x7b;');
      str = str.replace(/}/g, '&#x7d;');
      str = str.replace(/ /g, '&nbsp;');
      str = str.replace(/\r/g, '&#13;');
      str = str.replace(/\n/g, '&#10;');
    }
    return str;
  }

  /**
   * HTMLアンエスケープを行う。
   */
  public static fnReverseEscapeHtml(str: string): string {
    if (str !== undefined && Object.prototype.toString.call(str).slice(8, -1) == 'String') {
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&quot;/g, '"');
      str = str.replace(/&#39;/g, '\'');
      str = str.replace(/&#x7b;/g, '{');
      str = str.replace(/&#x7d;/g, '}');
      str = str.replace(/&nbsp;/g, ' ');
      str = str.replace(/&#13;/g, '\r');
      str = str.replace(/&#10;/g, '\n');
      str = str.replace(/\u00a0/g, ' ');
    }
    return str;
  }
  /**
   * 空文字かNULLならばtrue
   * @param str
   */
  public static isEmpty(str: string) {
    str = str + "";
    if (str == "null" || str == "" || str == "undefined" || str == null || str == undefined || str.length == 0) {
      return true;
    }
    return false;
  }

  public static isInteger(str: string) {
    var regex: RegExp = /^\d+$/;
    return regex.test(str);
  }

  public static parseInt(str: string) {
    return this.isEmpty(str) ? 0 : parseInt(str);
  }

  public static isDate(str: string) {

    if (str == "") {
      return true;
    }
    // 不正な値が入力されるとundefinedになる
    if (str == undefined) {
      return false;
    }

    if (!str.match(/^\d{4}\/[\d]+\/[\d]+$/)) {
      return false;
    } else {
      return new Date(str) instanceof Date && !isNaN(new Date(str).valueOf());
    }
  }

  public static fnIsNumeric(str: string) {
    if(str === null || str === undefined || str === ''){
      return false
    }else{
      if (str.match(/^(-?[0-9]+)(?=\.|$)/)) {
        return true;
      }
      return false;
    }
  }

  public static fnIsMinus(str: string) {
    if (this.fnIsNumeric(str) == false) {
      return false;
    }

    // 最初の一文字がマイナスか
    if (str.substring(0, 1) == "-") {
      return true;
    }
    return false;
  }


  public static GetIntPartDigit(str: string) {
    var pos = str.indexOf(".");

    // 小数点なし
    if (pos == -1) {
      return str.length;
    }

    var intPart = str.substring(0, pos);
    return intPart.length;
  }

  public static GetDecimalPartDigit(str: string) {
    var pos = str.indexOf(".");

    // 小数点なし
    if (pos == -1) {
      return 0;
    }

    var decimalPart = str.substring(pos + 1);
    return decimalPart.length;
  }


  public static IsDecimal(str: string) {
    if (this.fnIsNumeric(str) == false) {
      return false;
    }

    // ドットがあるか
    var pos = str.indexOf(".");

    // 小数点なし
    if (pos == -1) {
      return false;
    }
    return true;
  }

  public static checkRecordCnt(component:any, recordCnt:any){

    var dtoMessage =  new MessageDto();

    // 区分=2で、取得件数が設定値を越していたいらワーニングを表示する
    if (component.getSystemEntity("SYSKBN7") == "2" && parseInt(recordCnt) > parseInt(component.getSystemEntity("SYSNUMVAL1"))) {

      var msg = component.messageEntity.message["MW000010"];;
      msg = msg.replace("%1", "表示件数");
      msg = msg.replace("%2", component.systemEntity.value["SYSNUMVAL1"]);

      dtoMessage.message = msg;
      dtoMessage.popupType = "C";
    }

    // 区分=3で、取得件数が設定値を越していたらエラーにする
    if (component.getSystemEntity("SYSKBN7") == "3" && parseInt(recordCnt) > parseInt(component.getSystemEntity("SYSNUMVAL1"))) {
      var msg = component.messageEntity.message['ME000034'];
      msg = msg.replace("%1", "表示件数");
      msg = msg.replace("%2", component.systemEntity.value["SYSNUMVAL1"]);

      dtoMessage.message = msg;
      dtoMessage.popupType = "E";
    }

    return dtoMessage;
  }

 /**
 * 日付型チェック
 * @param str
 * @returns {Boolean}
 */
   public static fnIsDate(str:any){

    if(str == ""){
      return true;
    }

    // 不正な値が入力されるとundefinedになる
    if(str == undefined){
      return false;
    }

    if (!str.match(/^\d{4}\/[\d]+\/[\d]+$/)) {
      return false;
    } else {
      var parts = str.split( "/" );
      var year = Number(parts[0]);
      var month = Number(parts[1]) - 1;
      var day = Number(parts[2]);

      var dt=new Date(year ,month, day);
        return(dt.getFullYear()==year && dt.getMonth()==month && dt.getDate()==day);
    }
  }

  checkRecordCnt(this:any, recordCnt:any){

    var dtoMessage = new MessageDto();

    // 区分=2で、取得件数が設定値を越していたいらワーニングを表示する
    if (this.getSystemEntity("SYSKBN7") == "2" && parseInt(recordCnt) > parseInt(this.getSystemEntity("SYSNUMVAL1"))) {

      var msg = this.message['MW000010'];
      msg = msg.replace("%1", "表示件数");
      msg = msg.replace("%2", this.getSystemEntity("SYSNUMVAL1"));

      dtoMessage.message = msg;
      dtoMessage.popupType = "C";
    }

    // 区分=3で、取得件数が設定値を越していたらエラーにする
    if (this.getSystemEntity("SYSKBN7") == "3" && parseInt(recordCnt) > parseInt(this.getSystemEntity("SYSNUMVAL1"))) {
      var msg = this.message['ME000034'];
      msg = msg.replace("%1", "表示件数");
      msg = msg.replace("%2", this.getSystemEntity("SYSNUMVAL1"));

      dtoMessage.message = msg;
      dtoMessage.popupType = "E";
    }

    return dtoMessage;
  }

  /**
   * 画面項目名を配列にセット
   * @param formItemId				画面ID
   * @param formItemNm			画面名
   * @param formItemList			画面項目名配列
  */
  public static fnSetFormItemList(formItemId: string, formItemNm: string, formItemList: any) {
    var dtoFormItemInfo = new FormItemInfoDto();
    dtoFormItemInfo.formItemId = formItemId;
    dtoFormItemInfo.formItemNm = formItemNm;
    formItemList.push(dtoFormItemInfo);
  }

  /**
  * 半角英数チェック
  * @param str
  * @returns {Boolean}
  */
  public static fnIsAlphaNumber(str: any) {

    if (str == "") {
      return true;
    }

    // 不正な値が入力されるとundefinedになる
    if (str == undefined) {
      return false;
    }

    if (str.match(/^[A-Za-z0-9]*$/)) {
      return true;
    }
    return false;
  }
}
