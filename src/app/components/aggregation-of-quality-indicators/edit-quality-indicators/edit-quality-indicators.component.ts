import {Input, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { Ultility } from 'src/app/service/ultility.service';

@Component({
  selector: 'app-edit-quality-indicators',
  templateUrl: './edit-quality-indicators.component.html'
})
export class EditQualityIndicatorsComponent implements OnInit {

  @Input() param: any;
  BRCAcp = 'JP Acceptance Tester';
  CusAcp = 'Customer Acceptance';
  AfterRelease = 'After Release';
  TOTAL_MAN_HOURSTitle = 'Total Man-hours';
  MAN_HOURSTitle = 'Man-hours';
  
  TOTAL_MAN_HOURS = '0.00';
  MAN_HOURSMessage = '';
  NUMBER_OF_COMMENT = 0;
  NUMBER_OF_COMMENTMessage = '';
  MAN_HOURS_FOR_REVIEW = '0.00';
  MAN_HOURS_FOR_REVIEWMessage = '';
  NUMBER_OF_QA = 0;
  NUMBER_OF_QAMessage = '';
  NUMBER_OF_STEP = '';
  NUMBER_OF_STEPMessage = '';
  MAN_HOURS_FOR_AGGREGATION = 0;
  MAN_HOURS_FOR_AGGREGATIONMessage = '';
  MAN_HOURS_FOR_TRANSLATION = '0.00';
  MAN_HOURS_FOR_TRANSLATIONMessage = '';
  NUMBER_OF_PAGE = 0;
  NUMBER_OF_PAGEMessage = '';
  POINT_TO_NOTE = 0;
  POINT_TO_NOTEMessage = '';
  NUMBER_OF_TESTCASE = 0;
  NUMBER_OF_TESTCASEMessage = '';
  NUMBER_OF_BUG = 0;
  NUMBER_OF_BUGMessage = ''
  component: any;
  typeInfo = '';
  result: any = [];
  commenTitle = '';
  constructor(
    private apiService: ApiService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.component = this;
  }

  handleSubmitEdit() {
    var request = {
      ID: this.param.row.ID,
      ...this.param.data
    };
    this.apiService.post(this.param.serviceName, request).subscribe({
      next: res =>{
        this.result = res.rows;
        this.activeModal.close(this.result);
      },
      error: error =>{
        Ultility.fnSetErrorMsg(this, error.fatalError);
      }
    })
  }

  handleCancleEdit() {
    this.activeModal.close();
  }
}
