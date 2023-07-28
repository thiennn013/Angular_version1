import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getProjectCheckListWs } from 'src/app/common/Const';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Ultility } from 'src/app/service/ultility.service';
import { BaseComponent } from '../common/base/base.component';
import {
  fnOpenConfirm,
  fnOpenEditCheckListWindow,
} from 'src/app/common/SubWindow';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-checklist',
  templateUrl: './project-checklist.component.html',
  styleUrls: ['./project-checklist.component.css'],
})
export class ProjectChecklistComponent extends BaseComponent {
  CHECK_ITEMMessage = '';
  CLASSIFICATIONMessage = '';
  FREQUENCYMessage = '';
  FREQUENCY: string = '';
  CLASSIFICATION: string = '';
  CHECK_ITEM: string = '';
  ID: string = '';
  isEditItem: boolean = false;
  projectRole: any = '';
  tableData: any = [];
  dateHeader: any = [];
  constructor(
    protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router,
    protected ngbModal: NgbModal
  ) {
    super(authService, apiService, router);
  }

  @ViewChild('myTable') tableRef!: ElementRef;

  scrollTableToRight() {
    const tableElement = this.tableRef.nativeElement;
    tableElement.scrollLeft = tableElement.scrollWidth;
  }

  override fnInit(isMenu: boolean) {
    this.projectRole = this.authService.getProjectRole();
    this.apiService.post(getProjectCheckListWs, {}).subscribe({
      next: (response) => {
        this.dateHeader = response.listCheckDate;
        this.tableData = response.rows;
      },
    });
  }

  handleEdit(row: any, judgement: any, date: any) {
    console.log(row);
    console.log(judgement);
    console.log(date);
    fnOpenEditCheckListWindow(this.ngbModal, row, judgement, date);
  }

  cancleAddNewItemCheck() {
    this.isEditItem = false;
    this.ID = '';
    this.CHECK_ITEM = '';
    this.CLASSIFICATION = '';
    this.FREQUENCY = '';
    this.CHECK_ITEMMessage = '';
    this.CLASSIFICATIONMessage = '';
    this.FREQUENCYMessage = '';
  }

  handleAddNewDateCheck() {
    var modalRef = fnOpenConfirm(
      this.ngbModal,
      'Would you like to add new check date?',
      'Sure',
      'No'
    );
    modalRef.result.then((result: any) => {
      try {
        if (result == 'Sure') {
          let newCheckDate = Ultility.fnFormatDate(new Date().toISOString());
          this.apiService
            .post('add-new-date-check', { CHECK_DATE: newCheckDate })
            .subscribe({
              next: (response) => {
                this.dateHeader = response.listCheckDate;
                this.tableData = response.rows;
              },
            });
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
  addNewItemCheck(isinit: boolean) {
    if (isinit) {
      this.isEditItem = true;
      return;
    }
    var request = {
      ID: this.ID,
      FREQUENCY: this.FREQUENCY,
      CLASSIFICATION: this.CLASSIFICATION,
      CHECK_ITEM: this.CHECK_ITEM,
    };
    this.apiService.post('edit-check-item', request).subscribe({
      next: (response) => {
        this.dateHeader = response.listCheckDate;
        this.tableData = response.rows;
        this.isEditItem = false;
        this.cancleAddNewItemCheck();
      },
      error: (err) => Ultility.fnSetErrorMsg(this, err.error.fatalError),
    });
  }

  handleEditRow(row: any) {
    this.ID = row.CHECK_ITEM_ID;
    this.CHECK_ITEM = row.CHECK_ITEM;
    this.CLASSIFICATION = row.CLASSIFICATION;
    this.FREQUENCY = row.FREQUENCY;
    this.isEditItem = true;
  }
  override fnDestroy() {}
}
