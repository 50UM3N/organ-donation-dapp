export enum ThemeActionType {
  TOGGLE_THEME="TOGGLE_THEME",
}
export const toggleTheme = (theme: "dark" | "light") => {
  return {
    type: ThemeActionType.TOGGLE_THEME,
    payload: theme,
  };
};
