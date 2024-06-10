import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="pt-36 text-center">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/dashboard/addPet" state={{ from: location }} replace></Navigate>;

};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;