import { Action } from "@ngrx/store";
import { Subject } from "./../../common/entities/subject";

export enum ESubjectActions {
    GetSubjects = "GET_SUBJECTS",
    GetSubjectsSuccess = "GET_SUBJECTS_SUCCESS",
    AddSubject = "ADD_SUBJECT",
    AddSubjectSuccess = "ADD_SUBJECT_SUCCESS",
    GetStatisticsSubject = "GET_STATISTICS_SUBJECT",
    GetStatisticsSubjectSuccess = "GET_STATISTICS_SUBJECT_SUCCESS",
    UpdateSubject = "UPDATE_SUBJECT",
    UpdateSubjectSuccess = "UPDATE_SUBJECT_SUCCESS",
    GetSubject = "GET_SUBJECT",
    GetSubjectSuccess = "GET_SUBJECT_SUCCESS",

}
export class GetSubjects implements Action {
    public readonly type = ESubjectActions.GetSubjects;
}

export class GetSubjectsSuccess implements Action {
    public readonly type = ESubjectActions.GetSubjectsSuccess;
    constructor(public payload: Subject[]) { }
}

export class AddSubject implements Action {
    public readonly type = ESubjectActions.AddSubject;
    constructor(public payload: object) { }
}

export class AddSubjectSuccess implements Action {
    public readonly type = ESubjectActions.AddSubjectSuccess;
    constructor(public payload: Subject) { }
}

export class GetStatisticsSubject implements Action {
    public readonly type = ESubjectActions.GetStatisticsSubject;
    constructor(public payload: any) { }
}

export class GetStatisticsSubjectSuccess implements Action {
    public readonly type = ESubjectActions.GetStatisticsSubjectSuccess;
    constructor(public payload: any) { }
}

export class UpdateSubject implements Action {
    public readonly type = ESubjectActions.UpdateSubject;
    constructor(public subjectId: number, public name: string) { }
}

export class UpdateSubjectSuccess implements Action {
    public readonly type = ESubjectActions.UpdateSubjectSuccess;
    constructor(public payload: string) { }
}
export class GetSubject implements Action {
    public readonly type = ESubjectActions.GetSubject;
    constructor(public subjectId: number) { }
}

export class GetSubjectSuccess implements Action {
    public readonly type = ESubjectActions.GetSubjectSuccess;
    constructor(public payload: Subject) { }
}

export type SubjectAction = GetSubjects | GetSubjectsSuccess | AddSubject | AddSubjectSuccess
    | GetStatisticsSubject | GetStatisticsSubjectSuccess | UpdateSubject | UpdateSubjectSuccess
    | GetSubject | GetSubjectSuccess

