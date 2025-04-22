import React from "react";
import './TableDaily.css';

function TableWeekly() {
  const hallList = [];
  for (let i = 1; i <= 19; i++) {
    hallList.push({ label: "LT-" + i });
  }
  const days = [
    { day: "Sun" },
    { day: "Mon" },
    { day: "Tue" },
    { day: "Wed" },
    { day: "Thu" },
    { day: "Fri" },
    { day: "Sat" },
  ];

  return (
    <table className="dwm_main refreshable" id="day_main">
      <thead>
        <tr>
          <th className="first_last" style={{ width: "12.5%" }}>
            Halls
          </th>
          {days.map((e, key) => {
            return (
              <th
                className="new"
                key={key}
                style={{ width: "12.5%" }}
                name={e.day}
              >
                <a>{e.day}</a>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {hallList.map((e, key) => {
          return (
            <tr key={key}>
              <th className="new">
                <a>{e.label}</a>
              </th>
              {days.map((d, key_1) => {
                return (
                  <td
                    className="new"
                    key={key_1}
                    onClick={() => console.log(key + 1, key_1 + 1)}
                  >
                    <a></a>
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

export default TableWeekly;
