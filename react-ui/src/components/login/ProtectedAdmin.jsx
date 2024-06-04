import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { user, loading } = useSelector(state => state.user)
  if(loading) {
    return <div>Loading</div>
  }

  if(!user || ( user.type !== 999)) { // user is not logged or is not admin -> navivage to appropriate page
    return<Navigate to="/" />;
  }

  return <>{children}</>
};

export default ProtectedAdmin;
