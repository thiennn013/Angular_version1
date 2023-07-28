import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../common/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import * as Const from '../../common/Const';
import { data } from 'jquery';

@Component({
  selector: 'app-project-t',
  templateUrl: './project-t.component.html',
  styleUrls: ['./project-t.component.css']
})
export class ProjectTComponent extends BaseComponent  {

  constructor(
    private http: HttpClient, protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router
  ) {
    super(authService, apiService, router);
  }
  override fnDestroy() {}
   fnInit() {
  }

  hienthi : number[]=[]
  hienthi2 : number[]=[]
  addCheck: string =''
  selectedOption : any
  selectedRole : string='0'
  selectedRoleID : string='0'
  selectedTanSuat : string='0'

  listproject : any[]=[]
  listrole : any[]=[]
  listroleinPr : any[]=[]
  listTanSuat : any[]=[]

  noidung : noidung[]=[]

  fornote : note[]=[]

  showTable = false
  showForm1 = false;
  showForm  = false;

  openForm1() {
    if(this.selectedOption=='0')
      {
        alert("please choose Project")
        return
      }
    this.showForm1 = true;
   }

   showTS(ii:number): boolean {
    if(ii==0||this.noidung[ii].Phanloai!=this.noidung[ii-1].Phanloai)
    return true;
    return false
  }

   openForm() {
    if(this.selectedOption=='0')
      {
        alert("please choose Project")
        return
      }
    this.showForm = true;
   }


   override ngOnInit(): void {
    this.selectedOption=localStorage.getItem('IdPrj')  


    this.apiService
    .post(Const.getListPrj, {})
    .subscribe({ next: (response) => (this.listproject = response) });

    this.apiService
    .post(Const.getTanSuat , {})
    .subscribe({ next: (response) => (this.listTanSuat = response) });

    this.apiService
    .post(Const.getListRole , {})
    .subscribe({ next: (response) => (this.listrole = response) });

    this.loadTB()
  }


  loadTB(){
    this.noidung=[]
    this.fornote=[]
    this.hienthi=[]
    this.hienthi2=[]
    this.showTable=false

    this.apiService
    .post(Const.getCheckListPrj , {id:this.selectedOption})
    .subscribe({ next: (response) => {
      this.noidung = response
      this.fornote=this.noidung[0].note
      var a: number=0
      for( let i=0;i<this.noidung.length;i++)
      { a++
        if(i==this.noidung.length -1|| this.noidung[i].Phanloai !=this.noidung[i+1].Phanloai)
        {
          this.hienthi.push(a)
          a=0
        }
      }
      for( let i=0;i<this.noidung.length;i++)
      { this.hienthi2.push(this.hienthi[a])
        if(i==this.noidung.length -1|| this.noidung[i].Phanloai !=this.noidung[i+1].Phanloai)
        {
          a++
        }
      } 
    } });

    this.apiService
    .post(Const. getListRoleInPrj  , {id:this.selectedOption})
    .subscribe({ next: (response) => (this.listroleinPr = response) });
     this.showTable=true
  }

  submitForm1() {
    const listdate: any[] =[]
    if(this.noidung.length  != 0 )
    {
    this.noidung[0].note.forEach((item)=>
    {
      listdate.push(item.ngay)
    }
     )
    }
     const add_data = {
      roleMasterID: this.selectedRoleID,
      NoiDung: this.addCheck,
      listDate: listdate,
    };

    
    this.apiService
    .post(Const.addNewCheck , add_data)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });
    this.selectedRoleID=''
    this.addCheck=''
    this.closeForm1();
  }

  submitForm() {
    const add_data = {
      prjID: this.selectedOption,
      tanSuatID: this.selectedTanSuat,
      roleMasterID: this.selectedRole,
    };


    this.apiService
    .post(Const.addNewRole , add_data)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });

    this.selectedTanSuat=''
    this.selectedRole=''
    this.closeForm();
  }



  Xoacheck(item:any){
    this.apiService
    .post(Const.subCheck  , item)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });

  }


  addcheck(){
    var inputDate = prompt("Enter a date (YYYY-MM-DD):");
    const add_data = {
      noidung: this.noidung,
      ngay: inputDate
    };

    // addNewNote         = "tb-addnote";
    this.apiService
    .post(Const.addNewNote   , add_data)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });


  }




  subcheck(ngay:any){
    const sub_data = {
      noidung: this.noidung,
      ngay: ngay
    };

    // const subNote            = "tb-subnote";
    this.apiService
    .post(Const.subNote, sub_data)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });
  }

  onSelect(nt:any)
  {
    // editNotepd         = "tb-editnotepd";
    this.apiService
    .post(Const.editNotepd , nt)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });


  }

 onInputChange(nt:any)
  {
    // editNotend         = "tb-editnotend";
    this.apiService
    .post(Const.editNotend  , nt)
    .subscribe({ next: (response) => {
      // alert(response.mess)
      this.loadTB()} });
  }


  onInputChangecheck(nd:any, id:any)
  { 
  const check_data = {
    checkID: id,
    muccheck: nd
  };

  // editCheck          = "tb-editcheck";
  this.apiService
  .post(Const.editCheck  , check_data)
  .subscribe({ next: (response) => {
    // alert(response.mess)
    this.loadTB()} });
  }



  closeForm1() {
    this.showForm1 = false;
  }

  closeForm() {
    this.showForm = false;
  }


}



export interface note {
  noteID: number;
  ngay: string;
  phandoan: string;
  noidung:string;
}

export interface noidung {
  tansuat: string;
  Phanloai: string;
  muccheck: string;
  roleID: number;
  checkID: number;
  PjrID: number;
  note: note[]
}


