import { useState, useEffect } from "react";
import moment from "moment";

//mina komponenter
import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import List from "./components/List";
import AddToDo from "./components/AddToDo";
import DeleteToDo from "./components/DeleteToDo";

//mina moduler
import fetchHolidays from "./modules/fetchHolidays";
import { saveList, getList } from "./modules/storeData";
import {
  addHolidays,
  createDaysArray,
  splitInWeeks,
} from "./modules/calendarData";
import { defaultList } from "./modules/toDoList";

function App() {
  //hämta listan
  let currentList = getList("savedList");
  if (!currentList) currentList = defaultList;

  //states
  const [days, setDays] = useState([]);
  const [toDoList, setToDoList] = useState(currentList);
  const [monthIndex, setmonthIndex] = useState(0); //0 är innevarande månad
  const [monthHeadline, setMonthHeadline] = useState(
    moment().format("MMMM YYYY")
  );
  const [selectedDate, setSelectedDate] = useState({ date: null, toDo: [] });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //funktionen som hämtar datumen till kalendern och körs i useeffect
  function getDaysInMonth(holidaysForMonth) {
    let momentObj = moment();
    if (monthIndex !== 0) {
      momentObj = moment().set("month", moment().month() + monthIndex);
    }
    setMonthHeadline(momentObj.format("MMMM YYYY"));
    var firstDayNumber = momentObj.startOf("month").isoWeekday();
    let emptySquares; //veckodagar som tillhör förra månaden
    if (firstDayNumber === 0) {
      emptySquares = 6; //så här gör jag för att söndag har värdet 0
    } else {
      emptySquares = firstDayNumber - 1;
    }
    let daysInMonth = momentObj.daysInMonth();
    let numberOfSquares = daysInMonth + emptySquares;
    let daysArray = createDaysArray(
      numberOfSquares,
      emptySquares,
      momentObj,
      monthIndex,
      toDoList
    );
    if (holidaysForMonth) {
      daysArray = addHolidays(holidaysForMonth, daysArray);
    } //detta körs enbart i callback från fetch
    setDays(daysArray);
    saveList("savedList", toDoList)
  }

  useEffect(getDaysInMonth, [toDoList, monthIndex]);
  useEffect(() => {
    fetchHolidays(moment(monthHeadline).format("YYYY/MM"), getDaysInMonth);
  }, [monthHeadline]);

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
              saveList("savedList", toDoList);
            }
          }}
        />
      )}
      {deleteModalOpen && (
        <DeleteToDo
          setDeleteModalOpen={setDeleteModalOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          deleteTask={(task) => {
            let newList = toDoList.filter((toDo) => {
              return toDo.task !== task;
            });
            setToDoList(newList);
            saveList("savedList", newList);
          }}
        />
      )}
    </>
  );
}

export default App;
