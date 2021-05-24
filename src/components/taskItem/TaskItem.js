import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {checkTasks, removeTask, editTasks} from "../../redux/actions/taskActions";

import "./TaskItem.scss"

export const TaskItem = ({task, number, tasksType, tasks}) => {

    const [editTask, setEditTask] = useState({name: '', checked: false});
    const [upDateTask, setupDateTask] = useState({dublicate: false});

    const inputEl = useRef(null);
    const dispatch = useDispatch();

    const handleInputUpdate = (event) => {

        const editTaskCopy = {...editTask}

        editTaskCopy.name = event.target.value.trim();

        setEditTask(editTaskCopy);
    
            dispatch(editTasks({type: "EDIT_TASK", payload: {task, number, tasksType, editTaskCopy}}));

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
                    onChange={() => dispatch(checkTasks({type: 'CHECK_TASK', payload: {tasksType, number}}))}/>
            
           
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
            onClick={() => dispatch(removeTask({type: "REMOVE_TASK", payload: {tasksType, number}}))}></i>
             
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