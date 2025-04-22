import { Link} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

function Error() {
    const navigate = useNavigate();

    return (
      <div className="errorbg">
        <h1 className="errorcode404">Oops!</h1>
        <h2 className="errormsg">404 Page Not Found</h2>
        <p className="errordesc">The page you are looking for might have been removed, </p><p className="errordesc">had its name changed or is temporarily unavailable</p>
        <Link className="errordesc errordescret" style={{textDecoration:'none'}}
            onClick={() =>
              navigate("/", { replace: true, state: { pg: null } })
            }
        >
          Go to Homepage 
        </Link>{" "}
      </div>
  )
}

export default Error
