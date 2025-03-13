import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/useGetToken";
import { AdminContext } from "../context/AdminContext.jsx";
import { LoginContainer, LoginButton } from "./Login/styled-component.jsx";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { verify } = useContext(AdminContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isSuccess = await signIn();
      if (isSuccess === "success") {
        await verify();
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer className="login-container">
      <form onSubmit={(e) => handleLogin(e)}>
        <h2>הכנס כמנהל</h2>
        <LoginButton type="submit" disabled={loading}>
          {loading ? <ClipLoader size={9} /> : "התחברות"}
        </LoginButton>
      </form>
    </LoginContainer>
  );
};

export default SignIn;
