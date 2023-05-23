import { useEffect } from "react";
import "./Login.css";
import { Loader } from "@mantine/core";

interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Login({ setIsLogin }: LoginProps) {
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/oauth2/password?
        login=${process.env.REACT_APP_LOGIN}&password=${process.env.REACT_APP_PASSWORD}&client_id=${process.env.REACT_APP_CLIENT_ID}&hr=0&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
      {
        headers: {
          "x-secret-key": `${process.env.REACT_APP_SECRET_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.access_token) {
            localStorage.setItem("access_token", result.access_token);
          }
          setIsLogin(true);
        },
        (error) => {
          Error(error);
        }
      );
  });

  return (
    <div className="app-loader loader">
      <h1>Идет получение access_tokenа...</h1>
      <Loader size="xl" />
    </div>
  );
}
