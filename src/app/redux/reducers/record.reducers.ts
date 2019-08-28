import { RecordsAction, ERecordsActions } from "../actions/record.actions";

export const initialRecordsState = {};

const recordReducer = (
  state = initialRecordsState,
  action: RecordsAction
) => {
  switch (action.type) {
    case ERecordsActions.GetRecordsSuccess: {
      return { ...state, records: action.payload.records, info: action.payload.info };
    }
    case ERecordsActions.UpdateRecordsSuccess: {
      return { ...state, record: action.payload };
    }
    case ERecordsActions.SaveRecordsSuccess: {
      return { ...state, message: action.payload };
    }

    default:
      return state;
  }
};

export { recordReducer };
