import { ActionReducerMap } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { studentReducer } from "./student.reducers";
import { subjectReducer } from "./subject.reducers";
import { recordReducer } from "./record.reducers";

export const appReducers: ActionReducerMap<any> = {
    router: routerReducer,
    students: studentReducer,
    subjects: subjectReducer,
    records: recordReducer
};
