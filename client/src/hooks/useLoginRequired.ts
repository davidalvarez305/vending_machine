import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

export default function useLoginRequired() {
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  useEffect(() => {
    if (!ctx?.user.id && !ctx?.isLoading) {
      navigate("/login");
    }
  }, [ctx]);
}
