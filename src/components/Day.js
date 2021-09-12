import React from "react";

function Day({ setDeleteModalOpen, setAddModalOpen, day, setSelectedDate }) {
  let className;
  if (day.date) {
    className = "day";
  }
  if (day.isToday) {
    className = "day today";
  }
  let numberOfTasks = false;
  if (day.toDo) {numberOfTasks = day.toDo.length}

  return (
    <td id={day.id} className={className} >
      <div>
        <span className="date-digit">
          {day.date} 

          {day.date && (
            <button
              className={day.id}
              onClick={(e) => {
                setDeleteModalOpen(false);
                setAddModalOpen(true);
                setSelectedDate({date: e.target.className, toDo: day.toDo})
              }}
            >
              +
            </button>
          )}
          
        </span>
{day.holiday ? <div className="holiday">{day.holiday}</div> : <br />}
        {numberOfTasks ? 
          day.toDo.map(toDo=><a href="javascript.void(0)"
          className={day.id}
            onClick={(e) => {
              e.preventDefault()
              setDeleteModalOpen(true);
              setAddModalOpen(false);
              setSelectedDate({date: e.target.className, toDo: day.toDo})
            }}
          >{toDo}          
          </a>)
        : <br />}
      </div>
    </td>
  );
}

export default Day;
