import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import {
    GetRecords, GetRecordsSuccess, UpdateRecordsSuccess,
    SaveRecords, SaveRecordsSuccess, ERecordsActions
} from "../actions/record.actions";
import { SubjectService } from "./../../common/services/subject/subject.service";

@Injectable()
export class RecordsEffects {
    @Effect()
    public getRecords$ = this._actions.pipe(
        ofType<GetRecords>(ERecordsActions.GetRecords),
        switchMap((action) => this._subjectService.getRecordsById(action.payload).pipe(map((records: any) =>
            new GetRecordsSuccess(records))))
    );

    @Effect()
    public saveRecords$ = this._actions.pipe(
        ofType<SaveRecords>(ERecordsActions.SaveRecords),
        switchMap((action) => this._subjectService.updateJournal(action.typeId, action.payload).pipe(
            map((data: object) => {
                if (data) return new SaveRecordsSuccess("Success");
            })
        ))
    );
    constructor(private _subjectService: SubjectService, private _actions: Actions) { }
}
