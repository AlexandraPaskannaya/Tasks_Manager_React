import PropTypes from "prop-types";
import { useContext, useRef, useState } from "react";
import { Context } from "../../useContext"

import "./TaskItem.scss"

export const TaskItem = ({task, number, tasksType}) => {

    const {handleCheckStatus, removeTasks, editTasks} = useContext(Context);
    const [editTask, setEditTask] = useState({name: '', checked: false});

    const inputEl = useRef(null);

    const handleInputUpdate = (event) => {

        const editTaskCopy = {...editTask}

        editTaskCopy.name = event.target.value.trim();

        setEditTask(editTaskCopy);
    
        editTasks(task, number, tasksType, editTaskCopy);

      }

      const submitEditTask = (event) => {
    
        if((event.key === "Enter")){
         
            inputEl.current.blur();

            setEditTask({name: '', checked: false});

            console.log('editTask', tasksType, number, event.target.value);
      } 
    }

    return (
        <div className="task-item" id={number}>

            <input type="checkbox" 
                    checked={task.checked}
                    onChange={(event) => handleCheckStatus(tasksType, number, event.target.checked)}/>
            
           
            <input ref={inputEl} 
             value={task.name} 
             onChange={handleInputUpdate} 
             onKeyDown={submitEditTask}/>

           

            {!task.checked && 
            <i className="fas fa-edit" alt='edit'
            onClick={() => inputEl.current.focus()}></i>
            }

            {task.checked && 
            <i className="fas fa-trash-alt" alt='trash'
             onClick={() => removeTasks(tasksType, number)}></i>
             
            }
        </div>
    );
}

TaskItem.propTypes = {
    task:PropTypes.object,
    tasksType:PropTypes.string,
    number:PropTypes.number
};