import moment from "moment";
import { tasksForDate } from "./toDoList";

function addHolidays(holidaysForMonth, daysArray) {
  let holidays = holidaysForMonth.dagar.filter((dag) => {
    return dag.helgdag;
  });
  for (let i = 0; i < holidays.length; i++) {
    let holidayDate = moment(holidays[i].datum).format("D MMMM YYYY");
    let holidayName = holidays[i].helgdag;
    for (let j = 0; j < daysArray.length; j++) {
      if (daysArray[j].id === holidayDate) {
        Object.assign(daysArray[j], { holiday: holidayName });
      }
    }
  }
  return daysArray;
}

//en funktion som gör en array av dagarna i en månad
function createDaysArray(
  numberOfSquares,
  emptySquares,
  momentObj,
  monthIndex,
  toDoList
) {
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
        id: dateString, //momentObj är nu den första i månaden eftersom ändrat originalet
        date: dateOfDay,
        toDo: tasksForDate(dateString, toDoList)
          ? tasksForDate(dateString, toDoList)
          : false,
        isToday: dateOfDay === dateToday && monthIndex === 0,
      });
    }
  }
  return daysArray;
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

export { addHolidays, createDaysArray, splitInWeeks };
