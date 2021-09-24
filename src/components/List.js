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

  return (
    <section>
      <h3>Uppgifter denna månad</h3>
      <ol>
        {toDoList.map((toDo, i) =>
          toDo.date.includes(monthHeadline) ? (
            <li key={i}>
              <strong>{toDo.task}</strong>, senast{" "}
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
