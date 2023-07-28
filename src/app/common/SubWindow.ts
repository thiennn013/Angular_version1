import { EditQualityIndicatorsComponent } from '../components/aggregation-of-quality-indicators/edit-quality-indicators/edit-quality-indicators.component';
import { ConfirmDialogComponent } from '../components/common/confirm-dialog/confirm-dialog.component';
import { EditRowComponent } from '../components/edit-row/edit-row.component';
import { EditChecklistComponent } from '../components/project-checklist/edit-checklist/edit-checklist.component';

export const modalOptions = {
  backdrop: 'backdrop',
  backdropClass: 'customBackdrop',
  size: 'xl',
};

export function fnOpenEditQualityIndicatorsWindow(
  $modal: any,
  type: any,
  serviceName: string,
  row: any,
  data: any
) {
  var modalInstance = $modal.open(EditQualityIndicatorsComponent, modalOptions);
  modalInstance.componentInstance.param = {
    type: type,
    serviceName: serviceName,
    row: row,
    data: data,
  };
  return modalInstance;
}

export function fnOpenEditRowWindow(
  $modal: any,
  project: any,
  row: any,
  type: string
) {
  var modalInstance = $modal.open(EditRowComponent, modalOptions);
  modalInstance.componentInstance.param = {
    project: project,
    row: row,
    type: type,
  };
  return modalInstance;
}

export function fnOpenEditCheckListWindow(
  $modal: any,
  row: any,
  judgement: string,
  date: any
) {
  var modalInstance = $modal.open(EditChecklistComponent, modalOptions);
  modalInstance.componentInstance.param = {
    row: row,
    judgement: judgement,
    date: date,
  };
  return modalInstance;
}

export function fnOpenConfirm(
  $modal: any,
  message: string,
  ok: string,
  cancle: string
) {
  let modalOption = JSON.parse(JSON.stringify(modalOptions))
  modalOption.size = 'md';
  var modalInstance = $modal.open(ConfirmDialogComponent, modalOption);
  modalInstance.componentInstance.param = {
    message: message,
    ok: ok,
    cancle: cancle,
  };
  return modalInstance;
}
