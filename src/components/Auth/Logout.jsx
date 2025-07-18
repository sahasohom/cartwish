import { useEffect } from "react";
import { logOut } from "../../services/userServices";

const Logout = () => {
  useEffect(() => {
    logOut();

    window.location = "/";
  }, []);
  return null;
};

export default Logout;
