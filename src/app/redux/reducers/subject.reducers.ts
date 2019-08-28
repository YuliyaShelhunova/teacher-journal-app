import { SubjectAction, ESubjectActions } from "../actions/subject.actions";
const initialSubjectState = {};
const subjectReducer = (
    state = initialSubjectState,
    action: SubjectAction) => {
    switch (action.type) {
        case ESubjectActions.GetSubjectsSuccess: {
            return { ...state, subjects: action.payload }
        }
        case ESubjectActions.GetSubjects: {
            return { ...state };
        }
        case ESubjectActions.AddSubject: {
            return { ...state };
        }
        case ESubjectActions.AddSubjectSuccess: {
            state["subjects"].push(action.payload);
            return { ...state };
        }
        case ESubjectActions.GetStatisticsSubject: {
            return { ...state };
        }
        case ESubjectActions.GetStatisticsSubjectSuccess: {
            return { ...state, statistics: action.payload.statistics, info: action.payload.info };
        }

        default:
            return state;
    }
};

export { subjectReducer };
