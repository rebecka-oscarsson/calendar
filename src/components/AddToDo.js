import React, { useState } from "react";
import moment from "moment";

function AddToDo({ setAddModalOpen, selectedDate, saveTask }) {
  const [inputText, setInputText] = useState("");
  return (
    <section className="modal">
      <div>
      Lägg till uppgift {moment(selectedDate.date).format("DD MMMM")}
      <input
      required
        placeholder="att göra idag" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>
      <button onClick = {()=>saveTask(inputText)}
      >spara</button>
      {<button onClick={()=>setAddModalOpen(false)}>stäng</button> /*kanske behöver jag set selectedDate till null oxå? */}
    </div>
    </section>
  );
}

export default AddToDo;
