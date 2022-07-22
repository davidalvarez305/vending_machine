import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ME_ROUTE } from "../constants";
import useFetch from "./useFetch";

export default function useLoginRequired() {
  const navigate = useNavigate();
  const { makeRequest } = useFetch();

  useEffect(() => {
    makeRequest(
      {
        url: `${ME_ROUTE}`,
        method: "GET",
      },
      (res) => {
        if (!res.data.data.id) {
          navigate("../login");
        }
      }
    );
  }, []);
}
