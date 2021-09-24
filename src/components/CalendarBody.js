import Day from "./Day";

function CalendarBody({
  weeks,
  setSelectedDate,
  setDeleteModalOpen,
  setAddModalOpen,
}) {
  return (
    <tbody>
      {weeks.map((week, i) => (
        <tr key={i}>
          {week.map((day, j) => (
            <Day key={j}
              setDeleteModalOpen={setDeleteModalOpen}
              setAddModalOpen={setAddModalOpen}
              day={day}
              setSelectedDate={setSelectedDate}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CalendarBody;
