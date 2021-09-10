import React from 'react';

function DeleteToDo({ onDelete, eventText, onClose }) {
    
    return (
      <section>
        delete things to do
        <p>{eventText}</p>
        <button onClick = {onDelete}
        >delete</button>
        <button onClick={onClose}>close</button>
      </section>
    );
  }

export default DeleteToDo;