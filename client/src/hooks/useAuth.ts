import { useState } from "react";
import { useNavigate } from "react-router";
import { LOGOUT_ROUTE, ME_ROUTE } from "../constants";
import { User } from "../types/general";
import useFetch from "./useFetch";

export default function useAuth() {
  const { makeRequest } = useFetch();
  const navigate = useNavigate();
  let userProps = {
    id: null,
    username: "",
    password: "",
    email: "",
    is_admin: false,
  };
  const [user, setUser] = useState<User>(userProps);

  function Login(user: User) {
    setUser(user);
  }

  function Logout() {
    makeRequest(
      {
        url: `${LOGOUT_ROUTE}`,
        method: "POST",
      },
      (res) => {
        if (res.data.data === "Logged out!") {
          setUser(userProps);
          navigate("../login");
        }
      }
    );
  }

  function isLoggedIn() {
    makeRequest(
      {
        url: `${ME_ROUTE}`,
        method: "GET",
      },
      (res) => {
        if (!res.data.data.id) {
          navigate("../login");
        } else {
          setUser(res.data.data);
        }
      }
    );
  }

  return { Login, Logout, user, isLoggedIn };
}
