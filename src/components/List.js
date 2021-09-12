import React from "react";
import moment from "moment";

function List({ toDoList, monthHeadline }) {
  function compare(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  toDoList.sort(compare);

  let year = moment(monthHeadline).format("YYYY");
  let month = moment(monthHeadline).format("MMMM");

  return (
    <section>
      <h3>Uppgifter för {month}</h3>
      <ol>
        {toDoList.map((toDo) =>
          toDo.date.includes(month) && toDo.date.includes(year) ? (
            <li>
              <strong>{toDo.task}</strong>, deadline{" "}
              {moment(toDo.date).format("DD MMMM")}
            </li>
          ) : (
            ""
          )
        )}
      </ol>
    </section>
  );
}

export default List;
