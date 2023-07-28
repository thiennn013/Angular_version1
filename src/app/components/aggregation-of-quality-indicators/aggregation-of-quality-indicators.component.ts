import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getListQualityIndex } from 'src/app/common/Const';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import * as SubWindow from '../../common/SubWindow';
import { BaseComponent } from '../common/base/base.component';

@Component({
  selector: 'app-aggregation-of-quality-indicators',
  templateUrl: './aggregation-of-quality-indicators.component.html',
  styleUrls: ['./aggregation-of-quality-indicators.component.css'],
})
export class AggregationOfQualityIndicatorsComponent extends BaseComponent {
  GET_LIST_OF_MANAGEMENT = 'get-list-of-management';
  GET_LIST_OF_REQ_DEFINE = 'get-list-of-req-define';
  GET_LIST_OF_BASIC_DESIGN = 'get-list-of-basic-design';
  GET_LIST_OF_DETAIL_DESIGN = 'get-list-of-detail-design';
  GET_LIST_OF_IMPLEMENTATION = 'get-list-of-implementation';
  GET_LIST_OF_UT_SPEC = 'get-list-of-ut-spec';
  GET_LIST_OF_UT = 'get-list-of-ut';
  GET_LIST_OF_IT_SPEC = 'get-list-of-it-spec';
  GET_LIST_OF_IT = 'get-list-of-it';
  GET_LIST_OF_ST = 'get-list-of-st';
  GET_LIST_OF_BRC_ACP = 'get-list-of-brc-acp';
  GET_LIST_OF_CUS_ACP = 'get-list-of-cus-acp';
  GET_LIST_OF_RELEASE = 'get-list-of-after-release';

  EDIT_MANAGEMENT = 'edit-management';
  EDIT_REQ_DEFINE = 'edit-req-define';
  EDIT_BASIC_DESIGN = 'edit-basic-design';
  EDIT_DETAIL_DESIGN = 'edit-detail-design';
  EDIT_IMPLEMENTATION = 'edit-impl-testcode';
  EDIT_UT_SPEC = 'edit-ut-spec';
  EDIT_UT = 'edit-ut';
  EDIT_IT_SPEC = 'edit-it-spec';
  EDIT_IT = 'edit-it';
  EDIT_ST = 'edit-st';
  EDIT_BRC_ACP = 'edit-brc-acp';
  EDIT_CUS_ACP = 'edit-cus-acp';
  EDIT_RELEASE = 'edit-after-release';

  Management = 'Management';
  ReqDefine = 'Requirement Define';
  BasicDesign = 'Basic Design';
  DetailDesign = 'Detail Design';
  Programming = 'Programming';
  UTSpec = 'Unit Tester';
  ITSpec = 'Integration Tester';
  STType = 'ST';
  BRCAcp = 'JP Acceptance Tester';
  CusAcp = 'Customer Acceptance';
  AfterRelease = 'After Release';

  project: any;
  project_id: string | null = '';
  projectRole: any;
  tableData: any;

  listOfManagement: any = [];
  listOfReqDefine: any = [];
  listOfBasicDesign: any = [];
  listOfDetailDesign: any = [];
  listOfImplementer: any = [];
  listOfUtSpec: any = [];
  listOfUt: any = [];
  listOfITSpec: any = [];
  listOfIT: any = [];
  listOfST: any = [];
  listOfBRCAcp: any = [];
  listOfCusAcp: any = [];
  listOfAfterRelease: any = [];

  @ViewChild('myTable') tableRef!: ElementRef;

  scrollTableToRight() {
    const tableElement = this.tableRef.nativeElement;
    tableElement.scrollLeft = tableElement.scrollWidth;
  }

  constructor(
    protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router,
    private modalService: NgbModal
  ) {
    super(authService, apiService, router);
  }
  override fnInit(isMenu: boolean) {
    this.project = history.state;
    this.projectRole = this.authService.getProjectRole();

    this.apiService.post(getListQualityIndex, {}).subscribe({
      next: (response) => {
        this.tableData = response.rows;
        this.tableData = this.tableData.map((obj: any, index: number) => ({
          NO: index + 1,
          ...obj,
        }));
      },
    });
  }

  handleEdit(component: any, type: any, serviceName: string, row: any, data: any) {
    var modalRef = SubWindow.fnOpenEditQualityIndicatorsWindow(
      this.modalService,
      type,
      serviceName,
      row,
      data
    );
    modalRef.result.then((result: any) => {
      try {
        if (result) {
          component[type] = result;
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  handleEditRow(row: any, type: string) {
    var modalRef = SubWindow.fnOpenEditRowWindow(
      this.modalService,
      this.project,
      row,
      type
    );
    modalRef.result.then((result: any) => {
      try {
        if (result.length > 0) {
          this.tableData = result;
          this.tableData = this.tableData.map((obj: any, index: number) => ({
            NO: index + 1,
            ...obj,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
  
  handleShowFearture(component: any, serviceName: string, list: any) {
    if (component[list].length == 0) {
      this.apiService.post(serviceName, {}).subscribe({
        next: (response) => {
          component[list] = response.rows;
          list = response.rows;
        },
      });
    } else {
      component[list] = [];
    }
  }

  override fnDestroy() {}
}
