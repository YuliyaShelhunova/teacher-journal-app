import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map } from "rxjs/operators";
import { Student } from "./../../common/entities/student";
import { GetStudents, GetStudentsSuccess, EStudentActions,
     AddStudentSuccess, AddStudent, GetStatisticsStudent, GetStatisticsStudentSuccess } from "../actions/students.actions";

import { StudentService } from "./../../common/services/student/student.service";

@Injectable()
export class StudentEffects {
    @Effect()
    public getStudents$ = this._actions.pipe(
        ofType<GetStudents>(EStudentActions.GetStudents),
        switchMap(() => this._studentService.getAllStudents().pipe(map((students: Array<Student>) =>
            new GetStudentsSuccess(students))))
    );

    @Effect()
    public addStudent$ = this._actions.pipe(
        ofType<AddStudent>(EStudentActions.AddStudent),
        switchMap((action) =>
            this._studentService.addStudent(action.payload).pipe(
                map((data: Student) => {
                    return new AddStudentSuccess(data);
                })))
    );
    @Effect()
    public getStatisticsStudent$ = this._actions.pipe(
        ofType<GetStatisticsStudent>(EStudentActions.GetStatisticsStudent),
        switchMap((action) => this._studentService.getStatisticsStudent(action.payload).pipe(
            map((data: any) => {
                return new GetStatisticsStudentSuccess(data);
            })))
    );

    constructor(private _studentService: StudentService, private _actions: Actions) { }
}
