import React from "react";

function Header({ monthHeadline, showNext, showPrev }) {
  return (
    <tr>
      <td className="month-headline" colSpan="4">
        <h2>{monthHeadline}</h2>
      </td>
      <td colSpan="3">
        <button onClick = {showPrev}>previous</button>
        <button onClick = {showNext}>next</button>
      </td>
    </tr>
  );
}

export default Header;
