import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "./TableDaily.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TableDaily({ data, lectures, date }) {
  const time = [
    { t: "07:00" },
    { t: "07:30" },
    { t: "08:00" },
    { t: "08:30" },
    { t: "09:00" },
    { t: "09:30" },
    { t: "10:00" },
    { t: "10:30" },
    { t: "11:00" },
    { t: "11:30" },
    { t: "12:00" },
    { t: "12:30" },
    { t: "13:00" },
    { t: "13:30" },
    { t: "14:00" },
    { t: "14:30" },
    { t: "15:00" },
    { t: "15:30" },
    { t: "16:00" },
    { t: "16:30" },
    { t: "17:00" },
    { t: "17:30" },
    { t: "18:00" },
    { t: "18:30" },
    { t: "19:00" },
    { t: "19:30" },
    { t: "20:00" },
    { t: "20:30" },
    { t: "21:00" },
  ];

  const navigate = useNavigate();
  const now = dayjs();
  const isSuperAdmin = useSelector(state => state.users.isSuperAdmin);

   return (
    <table className="dwm_main refreshable" id="day_main">
      <thead>
        <tr>
          <th className="first_last" style={{ width: "3.448275%" }}>
            <a>Time</a>
          </th>
          {time.map((val, key) => (
            <th
              key={key}
              className="first_last"
              style={{ width: "3.448275%%" }}
            >
              <a>{val.t}</a>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.keys(data).map((value, key) => {
          return (
            <tr key={key}>
              <th className="new">
                <a>{data[value][0]}</a>
              </th>
              {lectures[key].map((value, key_1) => {
                return (
                  <td
                    key={key_1}
                    className="new"
                    onClick={() => {
                      if (value.purpose === null) {
                        if (now.diff(date, "day") > -2 && !isSuperAdmin) {
                          alert("Please book a slot atleast three days earlier.");
                        } else {
                          navigate(`/book/${key + 1}/${date}`);
                        }                      
                      } else {
                        navigate(`/details/${value._id}`);
                      }
                    }}
                    style={{
                      backgroundColor:
                        value.purpose === null
                          ? key % 2 === 1
                            ? "white"
                            : "#efefef"
                          : (value.admin1 || value.admin2 || value.admin3) ||
                            value.superAdmin
                          ? "green"
                          : "yellow",
                    }}
                  >
                    <a>{value.purpose !== "" ? value.purpose : ""}</a>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TableDaily.propTypes = {
  data: PropTypes.object.isRequired,
  lectures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  date: PropTypes.string.isRequired,
};

export default TableDaily;
