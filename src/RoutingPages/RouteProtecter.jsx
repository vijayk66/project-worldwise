import { useContext, useEffect } from "react";
import { AuthContext } from "../Components/FakeUserContext";
import { useNavigate } from "react-router-dom";

export function ProtectRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
  const navigateTo = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigateTo("/");
      }
    },
    [isAuthenticated, navigateTo]
  );

  return isAuthenticated ? children : null;
}
