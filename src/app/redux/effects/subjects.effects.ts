import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import {
    GetSubjects, GetSubjectsSuccess, AddSubject, AddSubjectSuccess,
    GetStatisticsSubject, GetStatisticsSubjectSuccess, ESubjectActions,
    UpdateSubject, UpdateSubjectSuccess, GetSubject, GetSubjectSuccess
} from "../actions/subject.actions";
import { SubjectService } from "./../../common/services/subject/subject.service";
import { Subject } from "../../common/entities/subject";

@Injectable()
export class SubjectsEffects {
    @Effect()
    public getSubjects$ = this._actions.pipe(
        ofType<GetSubjects>(ESubjectActions.GetSubjects),
        switchMap(() => this._subjectService.getAllSubjects().pipe(map((subjects: Subject[]) =>
            new GetSubjectsSuccess(subjects))))
    );

    @Effect()
    public addSubject$ = this._actions.pipe(
        ofType<AddSubject>(ESubjectActions.AddSubject),
        switchMap((action) =>
            this._subjectService.addSubject(action.payload).pipe(
                map((data: Subject) => {
                    return new AddSubjectSuccess(data);
                })))
    );

    @Effect()
    public updateSubject$ = this._actions.pipe(
        ofType<UpdateSubject>(ESubjectActions.UpdateSubject),
        switchMap((action) => this._subjectService.updateSubjectById(action.subjectId, action.name).pipe(
            map((data: Subject) => {
                if (data["id"]) {
                    return new UpdateSubjectSuccess(action.name);
                }
            })
        ))
    );

    @Effect()
    public getSubject$ = this._actions.pipe(
        ofType<GetSubject>(ESubjectActions.GetSubject),
        switchMap((action) => this._subjectService.getSubjectById(action.subjectId).pipe(
            map((data: Subject) => {
                return new GetSubjectSuccess(data);
            })
        ))
    );

    @Effect()
    public getStatisticsSubject$ = this._actions.pipe(
        ofType<GetStatisticsSubject>(ESubjectActions.GetStatisticsSubject),
        switchMap((action) => this._subjectService.getStatisticsSubject(action.payload).pipe(
            map((data: any) => {
                return new GetStatisticsSubjectSuccess(data);
            })))
    );

    constructor(private _subjectService: SubjectService, private _actions: Actions) { }
}
