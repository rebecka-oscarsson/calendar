import React, { useState } from "react";

function AddToDo({ date, onSave, onCancel }) {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");//vad är detta, hit har jag ej kommit
  return (
    <section>
      saker att göra {date}
      <input
       className= {error ? "emptyInput" : ""}
        placeholder="nåt jag måste göra" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>
      <button onClick = {()=>{if(inputText){setError(false); onSave(inputText)} else {setError(true)}}}
      >spara</button>
      <button onClick={onCancel}>näh</button>
    </section>
  );
}

export default AddToDo;
