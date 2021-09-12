class ToDo {
    constructor(task, date) {
      this.task = task;
      this.date = date;
    }
  }
  
  //en funktion som hittar toDos för ett datum
  let tasksForDate = (date, toDoList) => {
    let tasks = [];
    for (let index = 0; index < toDoList.length; index++) {
      if (toDoList[index].date === date) {
        tasks.push(toDoList[index].task);
      }
    }
    return tasks;
  };

  const defaultList = [
    new ToDo("mata morfar", "28 September 2021"),
    new ToDo("rasta krukväxten", "20 September 2021"),
    new ToDo("dammsug katten", "28 September 2021"),
  ]

  export { ToDo, tasksForDate, defaultList }