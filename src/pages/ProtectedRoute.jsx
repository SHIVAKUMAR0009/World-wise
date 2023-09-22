import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isauthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isauthenticated) navigate("/");
    },
    [isauthenticated, navigate]
  );

  return isauthenticated ? children : null;
}

export default ProtectedRoute;
