import { Link} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotAuthorized.css";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="errorbg">
      <h1 className="errorcode">403</h1>
      <h2 className="errormsg">Access Denied</h2>
      <p className="errordesc">You dont have the required </p><p className="errordesc">privileges to perform this action</p>
      <Link className="errordesc errordescret" style={{textDecoration:'none'}}
          onClick={() =>
            navigate("/", { replace: true, state: { pg: null } })
          }
      >
        Home Page
      </Link>{" "}
    </div>
  );
};

export default NotAuthorized;
