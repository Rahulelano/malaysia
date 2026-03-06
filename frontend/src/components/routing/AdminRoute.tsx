import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from '@/components/common/PageLoader';

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <PageLoader />;
    }

    if (user && user.role === 'admin') {
        return <Outlet />;
    }

    return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
