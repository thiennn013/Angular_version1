import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
})
export class FeatureComponent implements OnInit {
  list: any = [];
  @Input() HideShow = 'Show';
  @Input() feartureName: any;
  @Output() clickButton = new EventEmitter();
  data: any = [];
  handleShow() {
    this.clickButton.emit(this.data);
  }
  constructor() {}
  ngOnInit(): void {}
}
