import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/useGetToken";
import { VerifyTokenContext } from "../context/verifyTokenContext.jsx";
const LoginContainer = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  direction: rtl;

  form {
    border: 1px solid grey;
    border-radius: 20px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  h2 {
    margin-block-start: 0em;
    margin-block-end: 0.41rem;
  }

  input {
    background-color: #00d180;
    width: 9rem;
    padding-right: 1rem;
    height: 2.35rem;
    border: none;
    border-radius: 20px;
    font-size: 1rem;
    direction: rtl;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.41rem;
    margin-bottom: 0.41rem;
  }

  button {
    font-size: 1rem;
    height: 2.35rem;
    border-radius: 20px;
    background-color: #e6e5eb !important;
    color: black !important;
  }

  label {
    font-size: 1.25rem;
  }
`;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { verify } = useContext(VerifyTokenContext);

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

const LoginButton = styled.button`
  width: fit-content;
  border: none;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  height: 2.35rem;
  border-radius: 20px;
  background-color: #e6e5eb !important;
  color: black !important;
`;

export default SignIn;
