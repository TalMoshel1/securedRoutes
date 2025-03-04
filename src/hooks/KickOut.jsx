import { useNavigate } from "react-router-dom";
import { VerifyTokenContext } from "../context/verifyTokenContext";
import { useContext } from "react";


export const useKickOut = () => {
  const navigate = useNavigate();
  const {setIsVerified} = useContext(VerifyTokenContext)
  // const location = useLocation();


  const navigateToSignIn = () => {
    
    return navigate("/signin");
  };


  return { navigateToSignIn };
};
