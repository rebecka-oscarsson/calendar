import React from 'react';
import moment from "moment";

function DeleteToDo({setDeleteModalOpen, selectedDate, setSelectedDate, deleteTask }) {
    // Funktion för att radera items.
  //input är en array med id:s
  // function removeCompleted(completed) {
  //   currentList = currentList.filter(
  //     (toDoObject) => toDoObject.finished === false
  //   );
  //   return currentList;
  // }
    return (
      <section className="modal"><div>
        Saker att göra {moment(selectedDate.date).format("DD MMMM")}
        <div>{selectedDate.toDo.map(toDo=><p>{toDo} <button
        onClick={()=>deleteTask(toDo)}>ta bort</button></p>)}</div>
        <button onClick={()=>{setDeleteModalOpen(false); setSelectedDate(null)}}>stäng</button></div>
      </section>
    );
  }

export default DeleteToDo;