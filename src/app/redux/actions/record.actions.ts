import { Action } from "@ngrx/store";

import { JournalRecord } from "../../common/entities/journal-record";

export enum ERecordsActions {
    GetRecords = "GET_RECORDS",
    GetRecordsSuccess = "GET_RECORDS_SUCCESS",
    UpdateRecords = "UPDATE_RECORDS",
    UpdateRecordsSuccess = "UPDATE_RECORDS_SUCCESS",
    SaveRecords = "SAVE_RECORDS",
    SaveRecordsSuccess = "SAVE_RECORDS_SUCCESS"
}
export class GetRecords implements Action {
    public readonly type = ERecordsActions.GetRecords;
    constructor(public payload: number) { }
}

export class GetRecordsSuccess implements Action {
    public readonly type = ERecordsActions.GetRecordsSuccess;
    constructor(public payload: any) { }
}

export class UpdateRecords implements Action {
    public readonly type = ERecordsActions.UpdateRecords;
}

export class UpdateRecordsSuccess implements Action {
    public readonly type = ERecordsActions.UpdateRecordsSuccess;
    constructor(public payload: JournalRecord) { }
}

export class SaveRecords implements Action {
    public readonly type = ERecordsActions.SaveRecords;
    constructor(public typeId: number, public payload: object) { }
}

export class SaveRecordsSuccess implements Action {
    public readonly type = ERecordsActions.SaveRecordsSuccess;
    constructor(public payload: string) { }
}

export type RecordsAction = GetRecords | GetRecordsSuccess | UpdateRecordsSuccess | SaveRecords | SaveRecordsSuccess;
