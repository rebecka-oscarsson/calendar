import React from "react";
import moment from "moment";

function List({ toDoList, monthHeadline }) {
  let year = moment(monthHeadline).format("YYYY");
  let month = moment(monthHeadline).format("MMMM");
  return (
    <section>
      <h3>Uppgifter för {month}</h3>
      <ol>
        {toDoList.map((toDo) => (
          toDo.date.includes(month) && toDo.date.includes(year) ?
          <li>
            {toDo.task}, {moment(toDo.date).format("DD MMMM")}
          </li> : ""
        ))}
      </ol>
    </section>
  );
}

export default List;
