import PropTypes from "prop-types";
import { useRef, useState } from "react";
//import { Context } from "../../useContext"

import "./TaskItem.scss"

export const TaskItem = ({task, number, tasksType, checkTasks, removeTask, editTasks, tasks}) => {

    const [editTask, setEditTask] = useState({name: '', checked: false});
    const [upDateTask, setupDateTask] = useState({dublicate: false});

    const inputEl = useRef(null);

    const handleInputUpdate = (event) => {

        const editTaskCopy = {...editTask}

        editTaskCopy.name = event.target.value.trim();

        setEditTask(editTaskCopy);
    
        editTasks({task, number, tasksType, editTaskCopy});

        if(checkDublicatesEdit(tasks, editTask)) {

            resetDublicateEdit();
        }

      }

      const submitEditTask = (event) => {
    
        if(event.key === "Enter"){

            if(checkDublicatesEdit(tasks, editTask)) {

                inputEl.current.readOnly = true;
                
                inputEl.current.blur();

                setEditTask({name: '', checked: false});

                console.log('editTask');

            } else {

                highlightDublicatesEdit();

                console.log('такая задача уже существует')
            }
         
      } 
    }

    const checkDublicatesEdit = (tasks, editTask) => {

        const {unImportant, important, veryImportant} = tasks;

        if (unImportant.concat(important, veryImportant).filter(item => item.name === editTask.name).length > 1) {
          
            return false

       } else {
            
            return true;  
        }  

    }

    const highlightDublicatesEdit = () => {

        const upDateTaskCopy = {...upDateTask};

        upDateTaskCopy.dublicate = true;
        
        setupDateTask(upDateTaskCopy);
    }

    const resetDublicateEdit = () => {

        const upDateTaskCopy = {...upDateTask};

        upDateTaskCopy.dublicate = false;
        
        setupDateTask(upDateTaskCopy);

    }

    return (
        <div className="task-item" id={number}>

            <input type="checkbox" 
                    checked={task.checked}
                    onChange={() => checkTasks({tasksType, number})}/>
            
           
            <input ref={inputEl} 
             value={task.name} 
             onChange={handleInputUpdate} 
             onKeyDown={submitEditTask}
             readOnly/>

           

            {(!task.checked && editTask.name === '') && 
            <i className="fas fa-edit" alt='edit'
            onClick={() => {inputEl.current.focus();
                            inputEl.current.readOnly = false}}></i>
            }

            {task.checked && 
            <i className="fas fa-trash-alt" alt='trash'
             onClick={() => removeTask({tasksType, number})}></i>
             
            }
             {upDateTask.duplicate &&
             <span className="task-list-error">Такая задача уже существует</span>}
        </div>
    );
}

TaskItem.propTypes = {
    task:PropTypes.object,
    tasksType:PropTypes.string,
    number:PropTypes.number,
};