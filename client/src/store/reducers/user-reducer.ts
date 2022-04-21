import { Action, Reducer } from "redux";
import { UserActionType } from "../actions/user-action";

export type InitialUserState =
    | null
    | (object & {
          role: string;
          name: string;
          email: string;
          mobile: string;
          address: string;
          verified: boolean;
      });

export interface UserDispatchAction extends Action<UserActionType> {
    payload: Partial<InitialUserState>;
}

const userReducer: Reducer<InitialUserState, UserDispatchAction> = (state = null, action) => {
    switch (action.type) {
        case UserActionType.USER_ADD:
            return action.payload as InitialUserState;
        case UserActionType.USER_REMOVE:
            return null;
        default:
            return state;
    }
};

export default userReducer;
