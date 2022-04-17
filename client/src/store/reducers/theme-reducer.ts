import { ThemeActionType } from "../actions/theme-action";
import { Action, Reducer } from "redux";

export type InitialThemeState = "dark" | "light";

export interface ThemeDispatchAction extends Action<ThemeActionType> {
  payload: Partial<InitialThemeState>;
}

const themeReducer: Reducer<InitialThemeState, ThemeDispatchAction> = (state = "light", action) => {
  switch (action.type) {
    case ThemeActionType.TOGGLE_THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
