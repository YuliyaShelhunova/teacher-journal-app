import { StudentAction, EStudentActions } from "../actions/students.actions";
const initialStudentState: any[] = [] = [];
const studentReducer = (
    state = initialStudentState,
    action: StudentAction) => {
    switch (action.type) {
        case EStudentActions.GetStudentsSuccess: {
            return { ...state, students: action.payload }
        }
        case EStudentActions.GetStudents: {
            return { ...state };
        }
        case EStudentActions.AddStudent: {
            return { ...state };
        }
        case EStudentActions.AddStudentSuccess: {
            state["students"].push(action.payload);
            return { ...state };
        }
        case EStudentActions.GetStatisticsStudent: {
            return { ...state };
        }
        case EStudentActions.GetStatisticsStudentSuccess: {
            return { ...state, statistics: action.payload.statistics, info: action.payload.info };
        }

        default:
            return state;
    }
};

export { studentReducer };
