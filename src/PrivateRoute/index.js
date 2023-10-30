import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";
import performRequest from "../Services/restCalls";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  console.log(`Token out of perform request: ${jwt}`);
  if (jwt) {
    performRequest(`/api/auth/validate?token=${jwt}`, "GET", jwt).then(
      (isTokenValid) => {
        console.log(`Request when performing request: ${jwt}`);
        setIsValid(isTokenValid);
        setIsLoading(false);
      }
    );
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading === true ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
