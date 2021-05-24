import PropTypes from "prop-types";
import { useContext, useRef, useState } from "react";
import { Context } from "../../useContext"

import "./TaskItem.scss"

export const TaskItem = ({task, number, tasksType, dublicateCreationEdit}) => {

    const {handleCheckStatus, removeTasks, editTasks, resetDublicateEdit, checkDublicatesEdit, highlightDublicates, fullEdit} = useContext(Context);
    const [editTask, setEditTask] = useState({name: '', checked: false});

    const inputEl = useRef(null);

    const handleInputUpdate = (event) => {

        const editTaskCopy = {...editTask}

        editTaskCopy.name = event.target.value;

        setEditTask(editTaskCopy);
    
        editTasks(task, number, tasksType, editTaskCopy);

        if(dublicateCreationEdit) {

            resetDublicateEdit(tasksType);
        }

      }

      const submitEditTask = (event) => {
    
        if(event.key === "Enter" && event.target.value !== ""){

            if(checkDublicatesEdit(editTask, fullEdit)) {

                inputEl.current.blur();

                setEditTask({name: '', checked: false});

                console.log('editTask', tasksType, number, event.target.value);

            } else {

                highlightDublicates(tasksType);

                console.log('такая задача уже существует')
            }
         
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
    number:PropTypes.number,
    dublicateCreationEdit: PropTypes.bool
};