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
        <h2>Saker att göra {moment(selectedDate.date).format("DD MMMM")}</h2>
        <div>{selectedDate.toDo.map((toDo, i)=><p id={i}><span >{toDo}</span> <button
        onClick={()=>{deleteTask(toDo); document.getElementById(i).classList.add("done")}}>ta bort</button></p>)}</div>
        <button onClick={()=>{setDeleteModalOpen(false); setSelectedDate(null)}}>stäng/spara</button></div>
      </section>
    );
  }

export default DeleteToDo;