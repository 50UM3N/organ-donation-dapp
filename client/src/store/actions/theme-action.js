export const TOGGLE_THEME = "TOGGLE_THEME";

export const toggleTheme = (theme) => {
    return {
        type: TOGGLE_THEME,
        payload: theme,
    };
};
