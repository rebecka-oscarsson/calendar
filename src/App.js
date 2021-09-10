import { useState, useEffect } from "react";
import Header from "./components/Header";
import Day from "./components/Day";
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
      new ToDo("vattna morfar", 12),
      new ToDo("promenera krukväxten", 1),
      new ToDo("dammsug hunden", 5),
    ];

  let dayString = moment().toString(); //känns fel. var ska jag ha den här? den ändras ju inte när månad ändras

  //alla states
  const [days, setDays] = useState([]);
  const [toDoList, setToDoList] = useState(currentList);
  const [monthIndex, setmonthIndex] = useState(0); //0 är innevarande månad
  const [monthHeadline, setMonthHeadline] = useState(
    moment().format("MMMM YYYY")
  );
  const [selectedDate, setSelectedDate] = useState();

  // moment.locale('sv'); funkar inte

  let dateToday = moment().date();

  //en funktion som hittar toDos för ett datum
  let tasksForDate = (date) => {
    toDoList.find((task) => task.date === date);
  };

  //en funktion som gör en array av dagarna i en månad
  function createDaysArray(numberOfSquares, emptySquares, momentObj) {
    let daysArray = [];
    for (let index = 0; index < numberOfSquares; index++) {
      if (index < emptySquares) {
        daysArray.push({ date: null });
      } else {
        let dateOfDay = index - emptySquares + 1; //lägger på 1 eftersom index börjar på noll
        daysArray.push({
          id: dateOfDay + " " + momentObj.format("MMMM YYYY"), //momentObj är den första i månaden för jag glömt kopiera och ändrat originalet
          date: dateOfDay,
          toDo: tasksForDate(dayString),
          isToday: dateOfDay === dateToday && monthIndex === 0,
        });
      }
    }
    return daysArray;
  }

  //funktionen som skapar kalendern
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
  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  //ska den här ligga löst här?
  let weeks = sliceIntoChunks(days, 7);

  // Funktion för att lägga till en ny item till en lista.
  function saveList(savedList, currentList) {
    localStorage.setItem(savedList, JSON.stringify(currentList));
  }

  // Funktion för att radera items.
  //input är en array med id:s
  function removeCompleted(completed) {
    currentList = currentList.filter(
      (toDoObject) => toDoObject.finished === false
    );
    return currentList;
  }

  useEffect(createCalendar, [toDoList, monthIndex]);
  //första argumentet är en funktion, andra argumentet en array av värden, när dessa ändras körs funktionen

  return (
    <>
      <List toDoList={toDoList} />
      <table>
        <thead>
          <Header
            monthHeadline={monthHeadline}
            showNext={() => {
              setmonthIndex(monthIndex + 1);
            }}
            showPrev={() => {
              setmonthIndex(monthIndex - 1);
            }}
          />
          <tr>
            <th>Måndag</th>
            <th>Tisdag</th>
            <th>Onsdag</th>
            <th>Torsdag</th>
            <th>Fredag</th>
            <th>Lördag</th>
            <th>Söndag</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <Day
                  index={j}
                  day={day}
                  onClick={(e) => {
                    if (day.date) {
                      setSelectedDate(e.target.id);
                    }
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDate && !tasksForDate(selectedDate) && (
        <AddToDo
          date={selectedDate}
          onSave={(task) => {
            setToDoList([...toDoList, { task, date: selectedDate }]);
            localStorage.setItem("savedList", JSON.stringify(toDoList))
          }}
          onCancel={() => setSelectedDate(null)}
        />
      )}
      {/* rendera om villkor uppfyllda */}
      {selectedDate && tasksForDate(selectedDate) && (
        <DeleteToDo
          onDelete={(title) => {
            setToDoList([]);
          }}
          eventText={tasksForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
      {/* det här går inte för det räknar med att det bara finns ett evnt per dag */}
    </>
  );
}

export default App;
