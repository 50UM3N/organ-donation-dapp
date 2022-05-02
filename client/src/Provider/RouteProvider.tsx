import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface props {
    user: UserState;
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

const mapStateToProps = (state: RootState) => {
    return { user: state.userReducer };
};
export default connect(mapStateToProps)(RouteProvider);
