import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

export default function useLoginRequired() {
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  useEffect(() => {
    console.log(ctx);
    if (!ctx?.user.id) {
      navigate("/login");
    }
  }, [ctx]);
}
