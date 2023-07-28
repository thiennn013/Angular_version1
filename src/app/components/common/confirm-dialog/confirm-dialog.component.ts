import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ selector: 'ngbd-modal-focus', templateUrl: './confirm-dialog.component.html' })
export class ConfirmDialogComponent {
  @Input() param: any;
	constructor(public modal: NgbActiveModal) {
    
  }
}