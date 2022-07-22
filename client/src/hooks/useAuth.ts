import { useEffect, useState } from "react";
import { LOGOUT_ROUTE, ME_ROUTE } from "../constants";
import { User } from "../types/general";
import useFetch from "./useFetch";

export default function useAuth() {
  const { makeRequest } = useFetch();
  const [isLoading, setIsLoading] = useState(true);
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
        }
      }
    );
  }

  useEffect(() => {
    makeRequest(
      {
        url: `${ME_ROUTE}`,
        method: "GET",
      },
      (res) => {
        console.log(`Response: `, res.data.data);
        if (res.data.data.id) {
          setUser(res.data.data);
        }
        setIsLoading(false);
      }
    );
    console.log(`isLoading: ${isLoading}`);
    console.log(`User: `, user);
  }, []);

  return { Login, Logout, user, isLoading };
}
