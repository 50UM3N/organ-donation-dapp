import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
/**
 * Route Provider that helps to redirect to profile page if the user is
 * already Route
 * @param {Object} {user} get from state
 * @param {Array} {access} list of the role admitted to the route
 * @returns {JSX}
 */
const RouteProvider = ({ user, access = ["admin"] }) => {
    if (user && access.includes(user.role)) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};
const mapStateToProps = (state) => {
    return { user: state.userReducer };
};
export default connect(mapStateToProps)(RouteProvider);
