import { TOGGLE_THEME } from "../actions/theme-action";
const themeReducer = (state = "light", action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return action.payload;
        default:
            return state;
    }
};

export default themeReducer;
