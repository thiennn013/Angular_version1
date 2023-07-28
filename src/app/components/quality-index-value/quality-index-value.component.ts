import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IObjectString } from 'src/app/common/IObject';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { BaseComponent } from '../common/base/base.component';

@Component({
  selector: 'app-quality-index-value',
  templateUrl: './quality-index-value.component.html',
  styleUrls: ['./quality-index-value.component.css'],
})
export class QualityIndexValueComponent extends BaseComponent {
  projectRole: any;
  responseObj: IObjectString = {};
  tableData: any = [];
  tableItemNm = [
    { ROW_SPAN: 1, PHASE: 'Management', INDICATOR: 'Man-hours' },
    {
      ROW_SPAN: 3,
      PHASE: 'Requirements definition',
      INDICATOR: 'Review/Revision Effort Percentage',
    },
    { PHASE: '', INDICATOR: 'Point rate to number of pages' },
    { PHASE: '', INDICATOR: 'Indication rate for man-hours' },
    {
      ROW_SPAN: 4,
      PHASE: 'Basic Design',
      INDICATOR: 'Review/Revision Effort Percentage',
    },
    { PHASE: '', INDICATOR: 'Translation Effort Ratio' },
    { PHASE: '', INDICATOR: 'Point rate to number of pages' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    {
      ROW_SPAN: 4,
      PHASE: 'Detail Design',
      INDICATOR: 'Review/Revision Effort Percentage',
    },
    { PHASE: '', INDICATOR: 'Translation Effort Ratio' },
    { PHASE: '', INDICATOR: 'Point rate to number of pages' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    {
      ROW_SPAN: 5,
      PHASE: 'Implementation',
      INDICATOR: 'Number of steps per hour',
    },
    { PHASE: '', INDICATOR: 'Review/Revision Effort Percentage' },
    { PHASE: '', INDICATOR: 'Focus rate for number of steps' },
    {
      PHASE: '',
      INDICATOR: 'Indication rate against implementation man-hours',
    },
    { PHASE: '', INDICATOR: 'Rate of complaints against review man-hours' },
    {
      ROW_SPAN: 4,
      PHASE: 'Unit test specification',
      INDICATOR: 'Review/Revision Effort Percentage',
    },
    { PHASE: '', INDICATOR: 'Translation Effort Ratio' },
    { PHASE: '', INDICATOR: 'Point rate to number of cases' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    { ROW_SPAN: 3, PHASE: 'Unit test', INDICATOR: 'bug hit rate' },
    { PHASE: '', INDICATOR: 'Bug rate against number of steps' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    {
      ROW_SPAN: 4,
      PHASE: 'Integration test specification',
      INDICATOR: 'Review/Revision Effort Percentage',
    },
    { PHASE: '', INDICATOR: 'Translation Effort Ratio' },
    { PHASE: '', INDICATOR: 'Point rate to number of cases' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    { ROW_SPAN: 3, PHASE: 'Integration test', INDICATOR: 'bug hit rate' },
    { PHASE: '', INDICATOR: 'Bug rate against number of steps' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    { ROW_SPAN: 3, PHASE: 'System test', INDICATOR: 'bug hit rate' },
    { PHASE: '', INDICATOR: 'Bug rate against number of steps' },
    { PHASE: '', INDICATOR: 'Focus rate against man-hours' },
    {
      ROW_SPAN: 3,
      PHASE: 'BRC internal acceptance',
      INDICATOR: 'Received effort versus total work effort',
    },
    { PHASE: '', INDICATOR: 'Indication rate for number of steps' },
    { PHASE: '', INDICATOR: 'Indication rate for man-hours' },
    {
      ROW_SPAN: 2,
      PHASE: 'Customer acceptance',
      INDICATOR: 'Indication rate for number of steps',
    },
    { PHASE: '', INDICATOR: 'Indication rate for man-hours' },
    {
      ROW_SPAN: 2,
      PHASE: 'After release',
      INDICATOR: 'Indication rate for number of steps',
    },
    { PHASE: '', INDICATOR: 'Indication rate for man-hours' },
  ];

  override fnInit(isMenu: boolean) {
    this.projectRole = this.authService.getProjectRole();
   
    this.apiService.post('get-quality-index-value', {}).subscribe({
      next: (res: any) => {
        this.responseObj = res;
        let index = 3;
        let NO = 0;
        for (let key in this.responseObj) {
          let obj = {
            NO: ++NO,
            ROW_INDEX: ++index,
            E: this.responseObj[key].toFixed(4),
            F: (this.responseObj[key] * 0.7).toFixed(4),
            H: (this.responseObj[key] * 1.3).toFixed(4),
          };
          this.tableData.push(obj);
        }
        for (
          let i = 0, j = 0;
          i < this.tableItemNm.length, j < this.tableData.length;
          i++, j++
        ) {
          this.tableData[j] = {
            ...this.tableData[j],
            ...this.tableItemNm[i],
          };
        }
      },
      error: (error) => {
        alert(error.fatalError);
      },
    });
  }
  override fnDestroy() {}
  constructor(
    private route: ActivatedRoute,
    protected override authService: AuthService,
    protected override apiService: ApiService,
    protected override router: Router
  ) {
    super(authService, apiService, router);
  }
}
