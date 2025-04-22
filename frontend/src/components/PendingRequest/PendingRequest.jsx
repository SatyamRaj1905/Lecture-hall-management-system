import * as React from "react";
import "./PendingRequest.css";
import Pend from "./Pending";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Box, Typography, Link, LinearProgress } from '@mui/material';
import { useEffect } from "react";

export default function PendingRequestPage() {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const [pending, setPending] = React.useState(null);
  const loc = useLocation();

  const getData = async () => {
    return fetch("https://lt-management-backend.onrender.com/api/bookings/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 440) {
            navigate('/sessionExpired');
          } else if (res.status === 401) {
            navigate('/notAuthorized');
          } else {
            navigate('/error');
          }
  
          return {errors: res.status};
        }
      })
      .then((ans) => {
        if (ans.errors) {
          return {
            errors: ans.errors,
          };
        } else {
          return ans.data;
        }
      });
  };

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  React.useEffect(() => {
    if (data !== null) {
      if (data.errors === 403) {
        navigate("/login", { replace: true, state: { pg: loc.pathname } });
      } else if (data.errors === 440) {
        navigate("/sessionExpired", { replace: true });
      }

      console.log(data);

      if (data.errors) {
        navigate("/error");
      } else {
        setPending(data);
      }
    }
  }, [data]);

  const elements = React.useMemo(() => {
    let ele = [];
    if (pending !== null) {
      ele = pending.map((item, key) => {
        return (
          <Pend
            key={key}
            LtNumber={item.lt}
            date={dayjs(item.startDate).format("DD-MM-YYYY")}
            id={item.id}
          />
        );
      });
      return ele;
    }
  }, [pending]);


  if (elements === undefined || elements.length === 0) {
    return (
      <Box
        sx={{
          marginTop: "-9px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh', // Center vertically within the view
          backgroundColor: '#f0f4f8', // Light background color
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          padding: '20px', // Space inside the box
          textAlign: 'center', // Center text inside the box
        }}
      >
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ marginBottom: '16px', fontWeight: 'bold' }} // Additional styling for text
        >
          No Pending Requests Found
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/')} // Adjust the route to your home route
          sx={{
            marginTop: '8px',
            padding: '10px 20px',
            backgroundColor: '#1976d2', // Button background color
            color: '#ffffff', // Button text color
            borderRadius: '4px', // Rounded button
            textDecoration: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1565c0', // Darker on hover
            },
          }}
        >
          Go to Home
        </Link>
      </Box>
    );
  }

  return (
    <div className="pendingdiv">
      <Box className="pendingbox" sx={{ boxShadow: "10" }}>
        {elements}
      </Box>
    </div>
  );
}
