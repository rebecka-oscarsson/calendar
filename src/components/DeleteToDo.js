import React from 'react';
import moment from "moment";

function DeleteToDo({setDeleteModalOpen, selectedDate, setSelectedDate }) {
    
    return (
      <section className="modal"><p>
        Saker att göra {moment(selectedDate.date).format("DD MMMM")}
        <div>{selectedDate.toDo.map(toDo=><p>{toDo} <button
        >ta bort</button></p>)}</div>
        <button onClick={()=>{setDeleteModalOpen(false); setSelectedDate(null)}}>stäng</button></p>
      </section>
    );
  }

export default DeleteToDo;