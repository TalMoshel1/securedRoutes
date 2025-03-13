import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";

export const useKickOut = () => {
  const navigate = useNavigate();
  const { setIsVerified } = useContext(AdminContext);

  const navigateToSignIn = () => {
    return navigate("/signin");
  };

  return { navigateToSignIn };
};
