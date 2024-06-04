import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AlreadyLogged = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) {
    return <div>Loading</div>;
  }

  if (user) {
    // user is  logged already -> navivate to profile page
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AlreadyLogged;
