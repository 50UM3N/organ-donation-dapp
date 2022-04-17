import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IRootState } from "../store";
import { InitialUserState } from "../store/reducers/user-reducer";

interface props {
    user: InitialUserState;
    access: Array<string>;
}
const RouteProvider: React.FC<props> = ({ user, access = ["admin"] }) => {
    // @ts-ignore
    if (user && access.includes(user.role)) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

const mapStateToProps = (state: IRootState) => {
    return { user: state.userReducer };
};
export default connect(mapStateToProps)(RouteProvider);
