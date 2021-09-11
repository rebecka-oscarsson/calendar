import { useState, useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import List from "./components/List";
import AddToDo from "./components/AddToDo";
import DeleteToDo from "./components/DeleteToDo";
import moment from "moment";

function App() {
  //skapa klass
  class ToDo {
    constructor(task, date) {
      this.task = task;
      this.date = date;
    }
  }

  let currentList = JSON.parse(localStorage.getItem("savedList"));
  if (!currentList)
    currentList = [
      new ToDo("vattna morfar", "28 September 2021"),
      new ToDo("rasta krukväxten", "6 January 2022"),
      new ToDo("dammsug katten", "28 September 2021"),
    ];

  // let dayString = moment().toString();

  //alla states
  const [days, setDays] = useState([]);
  const [toDoList, setToDoList] = useState(currentList);
  const [monthIndex, setmonthIndex] = useState(0); //0 är innevarande månad
  const [monthHeadline, setMonthHeadline] = useState(
    moment().format("MMMM YYYY")
  );
  const [selectedDate, setSelectedDate] = useState({ date: null, toDo: [] });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // moment.locale('sv'); funkar inte

  //en funktion som hittar toDos för ett datum
  let tasksForDate = (date) => {
    let tasks = [];
    for (let index = 0; index < toDoList.length; index++) {
      if (toDoList[index].date === date) {
        tasks.push(toDoList[index].task);
      }
    }
    return tasks;
  };
  //en funktion som gör en array av dagarna i en månad
  function createDaysArray(numberOfSquares, emptySquares, momentObj) {
    let daysArray = [];
    let dateToday = moment().date();
    for (let index = 0; index < numberOfSquares; index++) {
      if (index < emptySquares) {
        daysArray.push({ date: null });
      } else {
        let dateOfDay = index - emptySquares + 1; //lägger på 1 eftersom index börjar på noll
        let dateString =
          dateOfDay + " " + momentObj.format("MMMM YYYY").toString();
        daysArray.push({
          id: dateString, //momentObj är den första i månaden för jag glömt kopiera och ändrat originalet
          date: dateOfDay,
          toDo: tasksForDate(dateString) ? tasksForDate(dateString) : false,
          isToday: dateOfDay === dateToday && monthIndex === 0,
        });
      }
    }
    return daysArray;
  }

  //funktionen som skapar kalendern och körs i useeffect
  function createCalendar() {
    //skapa ett momentobjekt:
    let momentObj = moment();

    //om användaren tryckt fram eller bak ändras månaden i moment-objektet
    if (monthIndex !== 0) {
      momentObj = moment().set("month", moment().month() + monthIndex);
    }

    //rubriken ovanför kalendern sätts till rätt månad och år
    setMonthHeadline(momentObj.format("MMMM YYYY"));

    //räknar ut antal dagar i månad och "tomma" veckodagar från förra månaden
    var firstDayNumber = momentObj.startOf("month").isoWeekday();
    let emptySquares; //veckodagar som tillhör förra månaden
    if (firstDayNumber === 0) {
      emptySquares = 6; //så här gör jag för att söndag har värdet 0
    } else {
      emptySquares = firstDayNumber - 1;
    }
    let daysInMonth = momentObj.daysInMonth();
    let numberOfSquares = daysInMonth + emptySquares;
    let daysArray = createDaysArray(numberOfSquares, emptySquares, momentObj);
    setDays(daysArray);
  }

  //funktion som delar upp månads-array i vecko-arrays
  function splitInWeeks(monthArray) {
    const result = [];
    for (let i = 0; i < monthArray.length; i += 7) {
      const weekArray = monthArray.slice(i, i + 7);
      result.push(weekArray);
    }
    return result;
  }

  // Funktion för att lägga till en ny item till en lista.
  function saveList(savedList, currentList) {
    localStorage.setItem(savedList, JSON.stringify(currentList));
  }

  useEffect(createCalendar, [toDoList, monthIndex]);
  //första argumentet är en funktion, andra argumentet en array av värden, när dessa ändras körs funktionen

  return (
    <>
      <List toDoList={toDoList} monthHeadline={monthHeadline} />

      <table>
        <CalendarHeader
          monthHeadline={monthHeadline}
          showNext={() => {
            setmonthIndex(monthIndex + 1);
          }}
          showPrev={() => {
            setmonthIndex(monthIndex - 1);
          }}
        />
        <CalendarBody
          weeks={splitInWeeks(days)}
          setSelectedDate={setSelectedDate}
          setDeleteModalOpen={setDeleteModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      </table>

      {addModalOpen && (
        <AddToDo
          setAddModalOpen={setAddModalOpen}
          selectedDate={selectedDate}
          saveTask={(task) => {
            if (task) {
              setToDoList([...toDoList, { task, date: selectedDate.date }]);
              localStorage.setItem("savedList", JSON.stringify(toDoList));
            } //flytta till modul
          }}
        />
      )}
      {/* rendera om villkor uppfyllda */}
      {
        // selectedDate && tasksForDate(selectedDate)
        deleteModalOpen && (
          <DeleteToDo
            setDeleteModalOpen={setDeleteModalOpen}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            deleteTask={function(task){
              let newList = toDoList.filter(function(toDo) {
                return toDo.task !== task;
              });
              setToDoList(
                newList)
              ;
              localStorage.setItem("savedList", JSON.stringify(newList));
              //flytta till modul
            }}
          />
        )
      }
      {/* det här går inte för det räknar med att det bara finns ett evnt per dag */}
    </>
  );
}

export default App;
