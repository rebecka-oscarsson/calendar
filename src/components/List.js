import React from 'react';

function List({toDoList}) 
{return(<ol>
    {toDoList.map((toDo)=><li>{toDo.task}</li>)}
</ol>)}

export default List;