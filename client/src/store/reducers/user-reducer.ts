import { Action, Reducer } from "redux";
import { UserActionType } from "../actions/user-action";

export interface UserDispatchAction extends Action<UserActionType> {
    payload: Partial<UserState>;
}

const userReducer: Reducer<UserState, UserDispatchAction> = (state = null, action) => {
    switch (action.type) {
        case UserActionType.USER_ADD:
            return action.payload as UserState;
        case UserActionType.USER_REMOVE:
            return null;
        default:
            return state;
    }
};

export default userReducer;
