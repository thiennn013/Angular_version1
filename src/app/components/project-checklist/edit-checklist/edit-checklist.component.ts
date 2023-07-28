import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { Ultility } from 'src/app/service/ultility.service';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
})
export class EditChecklistComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private activeModal: NgbActiveModal
  ) {}

  @Input() param: any;
  result: any = [];
  JUDGEMENTMessage = '';
  ngOnInit(): void {
    this.param.judgement.CHECK_DATE = this.param.date;
  }
  handleChangCheckBox() {
    if (this.param.judgement.JUDGEMENT != '') {
      this.JUDGEMENTMessage = '';
    }
  }

  handleSubmitEdit() {
    var request = {
      ...this.param.judgement,
    };
    this.apiService.post('edit-pj-checklist', request).subscribe({
      next: (res) => {
        this.result = res.rows;
        this.activeModal.close(this.result);
      },
      error: (error) => {
        let component: any = this;
        error.error.fatalError.forEach(
          (x: { controlID: string | undefined; errMsg: any }) => {
            if (x.controlID != '' && x.controlID != undefined) {
              component[x.controlID + 'Message'] = x.errMsg;
            }
          }
        );
      },
    });
  }

  handleCancleEdit() {
    this.activeModal.close();
  }
}
