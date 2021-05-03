import PropTypes from "prop-types";
import {useState, useRef} from "react";

import {TaskItem} from "../taskItem/TaskItem";
import "./TaskList.scss";

export const TaskList = ({tasks, tasksType, addNewTask, dublicateCreation}) => {

    const [taskName, setTaskName] = useState('');

    const inputEl = useRef(null);

    const handleInputChange = (event) => {

            setTaskName(event.target.value.trim());
    }

    const handleKeyDown = (event) => {

        if(event.key === "Enter") {

            if(taskName.length > 0 ) {

                inputEl.current.blur();

                console.log("handleKeyDown", taskName, tasksType);

                addNewTask(taskName, tasksType);

                setTaskName("");           

            } else {

                setTaskName("");  
                return

            }
        }
    }

   

    return (

            <div className="task-list">

                {tasks && tasks.length > 0 && tasks.map((task, index) => {
                    return(
                        <TaskItem key={index} 
                                  task={task} 
                                  number={index} 
                                  checked={task.checked}
                                  tasksType={tasksType}/>
                    )
                })}

                <input type="text"
                        ref={inputEl}
                        placeholder="Введите задачу"
                        name={tasksType}
                        value={taskName}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} />

                {dublicateCreation
                &&
                <span className="task-list-error">Такая задача уже существует</span>}
                

            </div>
    );
}

TaskList.propTypes = {
    tasks:PropTypes.object,
    tasksType:PropTypes.string,
    addNewTask:PropTypes.func
};