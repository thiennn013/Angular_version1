import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { Ultility } from 'src/app/service/ultility.service';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
})
export class EditRowComponent implements OnInit {
  @Input() param: any;
  CLASSIFICATION = '';
  WORK_CONTENT = '';
  DIFFICULTY = '';
  REQUIRE_DEFINE = '';
  BASIC_DESIGN = '';
  DETAIL_DESIGN = '';
  PROGRAMMER = '';
  UNIT_TESTER = '';
  INTEGRATION_TESTER = '';
  ACCEPTANCE_TESTER = '';
  CLASSIFICATIONMessage = '';
  WORK_CONTENTMessage = '';
  DIFFICULTYMessage = '';
  REQUIRE_DEFINEMessage = '';
  BASIC_DESIGNMessage = '';
  DETAIL_DESIGNMessage = '';
  PROGRAMMERMessage = '';
  UNIT_TESTERMessage = '';
  INTEGRATION_TESTERMessage = '';
  ACCEPTANCE_TESTERMessage = '';
  ID = 0;
  listOfUser: any = [];
  header = 'Edit';
  result: any = [];
  typeInfo = '';
  constructor(
    private apiService: ApiService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    switch (this.param.type) {
      case 'ADD':
        this.header = 'Add';
        break;
      case 'EDIT':
        this.ID = this.param.row.ID;
        this.CLASSIFICATION = this.param.row.CLASSIFICATION;
        this.WORK_CONTENT = this.param.row.WORK_CONTENT;
        this.DIFFICULTY = this.param.row.DIFFICULTY;
        this.REQUIRE_DEFINE = this.param.row.REQUIRE_DEFINE_ID;
        this.BASIC_DESIGN = this.param.row.BASIC_DESIGN_ID;
        this.DETAIL_DESIGN = this.param.row.DETAIL_DESIGN_ID;
        this.PROGRAMMER = this.param.row.PROGRAMMER_ID;
        this.UNIT_TESTER = this.param.row.UNIT_TESTER_ID;
        this.INTEGRATION_TESTER = this.param.row.INTEGRATION_TESTER_ID;
        this.ACCEPTANCE_TESTER = this.param.row.ACCEPTANCE_TESTER_ID;
        this.header = 'Edit';
    }
    this.apiService
      .post('get-list-project-member', {})
      .subscribe((response) => (this.listOfUser = response.rows));
  }

  handleSubmitEdit() {
    var request = {
      ID: this.ID,
      CLASSIFICATION: this.CLASSIFICATION,
      WORK_CONTENT: this.WORK_CONTENT,
      DIFFICULTY: this.DIFFICULTY,
      REQUIRE_DEFINE: this.REQUIRE_DEFINE,
      BASIC_DESIGN: this.BASIC_DESIGN,
      DETAIL_DESIGN: this.DETAIL_DESIGN,
      PROGRAMMER: this.PROGRAMMER,
      UNIT_TESTER: this.UNIT_TESTER,
      INTEGRATION_TESTER: this.INTEGRATION_TESTER,
      ACCEPTANCE_TESTER: this.ACCEPTANCE_TESTER,
    };
    this.apiService.post('edit-quality-row', request).subscribe({
      next: (response) => {
        this.result = response.rows;
        this.activeModal.close(this.result);
      },
      error: (error) => Ultility.fnSetErrorMsg(this, error.fatalError),
    });
  }

  handleCancleEdit() {
    this.activeModal.close();
  }
}
