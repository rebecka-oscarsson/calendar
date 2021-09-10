import React from 'react';

function Day({index, day, onClick}) {
    let className;
    if(day.date) {className="day"}
    if(day.isToday) {className="today"}
    return (
        <td key={index} id={day.id} className = {className} onClick = {onClick}>
            {day.date}
        </td>
    )
}

export default Day;