import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();

  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">Session Expired</Typography>
      <Typography variant="body1" color={'#000000a0'}>
        Please{" "}
        <Link
          onClick={() => {
            navigate("/login", { replace: true, state: { pg: null } });
          }}
        >
          Login
        </Link>{" "}
        again
      </Typography>
    </Box>
  );
};

export default SessionExpired;
