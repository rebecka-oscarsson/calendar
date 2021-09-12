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
      <div>
      <button onClick = {()=>{saveTask(inputText); setInputText("sparat!")} }
      >spara</button>
      {<button onClick={()=>setAddModalOpen(false)}>stäng</button>}
      </div>
    </div>
    </section>
  );
}

export default AddToDo;
