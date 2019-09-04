import { Action } from "@ngrx/store";
import { Subject } from "./../../common/entities/subject";

export enum ESubjectActions {
    GetSubjects = "GET_SUBJECTS",
    GetSubjectsSuccess = "GET_SUBJECTS_SUCCESS",
    AddSubject = "ADD_SUBJECT",
    AddSubjectSuccess = "ADD_SUBJECT_SUCCESS",
    GetStatisticsSubject = "GET_STATISTICS_SUBJECT",
    GetStatisticsSubjectSuccess = "GET_STATISTICS_SUBJECT_SUCCESS"

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

export type SubjectAction = GetSubjects | GetSubjectsSuccess | AddSubject | AddSubjectSuccess | GetStatisticsSubject | GetStatisticsSubjectSuccess

