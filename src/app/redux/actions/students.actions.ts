import { Action } from "@ngrx/store";
import { Student } from "./../../common/entities/student";

export enum EStudentActions {
    GetStudents = "GET_STUDENTS",
    GetStudentsSuccess = "GET_STUDENTS_SUCCESS",
    AddStudent = "ADD_STUDENT",
    AddStudentSuccess = "ADD_STUDENT_SUCCESS",
    GetStatisticsStudent = "GET_STATISTICS_STUDENT",
    GetStatisticsStudentSuccess = "GET_STATISTICS_STUDENT_SUCCESS"
}
export class GetStudents implements Action {
    public readonly type = EStudentActions.GetStudents;
}

export class GetStudentsSuccess implements Action {
    public readonly type = EStudentActions.GetStudentsSuccess;
    constructor(public payload: Array<Student>) { }
}

export class AddStudent implements Action {
    public readonly type = EStudentActions.AddStudent;
    constructor(public payload: any) { }
}

export class AddStudentSuccess implements Action {
    public readonly type = EStudentActions.AddStudentSuccess;
    constructor(public payload: Student) { }
}

export class GetStatisticsStudent implements Action {
    public readonly type = EStudentActions.GetStatisticsStudent;
    constructor(public payload: any) { }
}

export class GetStatisticsStudentSuccess implements Action {
    public readonly type = EStudentActions.GetStatisticsStudentSuccess;
    constructor(public payload: any) { }
}

export type StudentAction = GetStudents | GetStudentsSuccess | AddStudent | AddStudentSuccess | GetStatisticsStudent | GetStatisticsStudentSuccess

