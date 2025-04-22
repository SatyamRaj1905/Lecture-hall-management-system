import React, { useEffect, useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/material";
import "../Tables/TableDaily.css";
import Table1 from "../Tables/TableDaily";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import LinearProgress from "@mui/material/LinearProgress";

//change1
import { ThemeProvider } from '@mui/material/styles';
import theme from './Multitheme';


function makeArray(w, h, val) {
  var arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}

const dayMap = {
  0: ["sunST", "sunET"],
  1: ["monST", "monET"],
  2: ["tueST", "tueET"],
  3: ["wedST", "wedET"],
  4: ["thuST", "thuET"],
  5: ["friST", "friET"],
  6: ["satST", "satET"],
};

const Home = () => {
  const [value, setValue] = useState(dayjs());

  const [data, setData] = useState([]);

  const [ltData, setLTData] = useState({});

  const [loader, setLoader] = useState(false);

  const getTT = async (date) => {
    return fetch("https://lt-management-backend.onrender.com/api/bookings/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ date }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  const getLT = async () => {
    return fetch("https://lt-management-backend.onrender.com/api/rooms/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return {};
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  useEffect(() => {
    setLoader(true);
    getLT().then((res) => {
      setLTData(res);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    setLoader(true);
    getTT(value.format("YYYY-MM-DD")).then((res) => {
      setData(res);
      setLoader(false);
    });
  }, [value]);

  const parsedData = useMemo(() => {
    setLoader(true);

    let ans = makeArray(29, Object.keys(ltData).length, {
      purpose: null,
    });

    if (data.length > 0 && Object.keys(ltData).length > 0) {
      for (let d of data) {
        if (
          d[dayMap[value.day()][0]] === -1 ||
          d[dayMap[value.day()][1]] === -1
        ) {
          continue;
        }

        const st = (d[dayMap[value.day()][0]] - 1 - 700) / 50;
        const et = (d[dayMap[value.day()][1]] - 700) / 50;

        for (let i = st; i < et; i++) {
          ans[ltData[d.ltId][1]][i] = {
            _id: d._id.toString(),
            admin1: d.admin1,
            admin2: d.admin2,
            admin3: d.admin3,
            superAdmin: d.superAdmin,
            purpose: d.purpose,
          };
        }
      }
    }

    setLoader(false);
    return ans;
  }, [data, ltData, value]);

  if (loader) {
    return (
      <Box
        style={{
          marginTop: '-9px',
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <Box style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              justifyContent: "flex-start",
            }}
            style={{
              display: "flex",
              marginTop: "40px",
              marginRight: "45px",
              marginLeft: "45px",
            }}
          >
            <Box
              sx={{
                display: { xl: "none", lg: "none", xs: "", md: "", sm: "" },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ my: { xl: 5, lg: 5, xs: 0, md: 0, sm: 0 } }}>
            <div
              className="table_container"
              style={{
                // display: c1 ? "" : "none",
                marginRight: "45px",
                marginLeft: "45px",
              }}
            >
              <Table1
                data={ltData}
                lectures={parsedData}
                date={value.format("YYYY-MM-DD")}
              />
            </div>
          </Box>
        </Box>
        <Box
          style={{
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            marginTop: "80px",
            marginRight: "20px",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: {
                xl: "flex",
                lg: "flex",
                xs: "none",
                md: "none",
                sm: "none",
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="mobile"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Home;
