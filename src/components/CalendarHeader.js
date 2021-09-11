import React from "react";

function CalendarHeader({ monthHeadline, showNext, showPrev }) {
  return (
    <thead>
      <tr>
        <td className="month-headline" colSpan="4">
          <h2>{monthHeadline}</h2>
        </td>
        <td colSpan="3">
          <button onClick={showPrev}>bakåt</button>
          <button onClick={showNext}>framåt</button>
        </td>
      </tr>
      <tr>
        <th>Måndag</th>
        <th>Tisdag</th>
        <th>Onsdag</th>
        <th>Torsdag</th>
        <th>Fredag</th>
        <th>Lördag</th>
        <th>Söndag</th>
      </tr>
    </thead>
  );
}

export default CalendarHeader;
