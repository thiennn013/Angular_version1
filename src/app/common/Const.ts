import { isDevMode } from '@angular/core';

export function serverHost(): string {
  return isDevMode() ? 'http://localhost:8023' : '';
}

// For format
export const locale = 'en-US';
export const dateFormat = 'yyyy/MM/dd';

export const projectWs = "project";
export const getProjectCheckListWs = "get-pj-checklist";
export const getListQualityIndex = "quality-index";



// For table check
export const getListPrj         = "tb-listprj";
export const getCheckListPrj    = "tb-listid";
export const addNewNote         = "tb-addnote";
export const subNote            = "tb-subnote";
export const editNotepd         = "tb-editnotepd";
export const editNotend         = "tb-editnotend";
export const editCheck          = "tb-editcheck";
export const getListRole        = "tb-listrole";
export const getTanSuat         = "tb-listtansuat";
export const addNewCheck        = "tb-addcheck";
export const subCheck           = "tb-subcheck";
export const getListRoleInPrj   = "tb-listrole-inprj";
export const addNewRole         = "tb-addrole";


