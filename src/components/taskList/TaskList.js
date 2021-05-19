import PropTypes from "prop-types";
import {useState, useRef} from "react";
import {connect} from "react-redux";

import {createTask, checkDublicates, checkTasks, removeTask, editTasks} from "../../redux/actions/taskActions";
import {TaskItem} from "../taskItem/TaskItem";
import "./TaskList.scss";

 const TaskList = ({tasks, tasksType, createTask, checkDublicates, checkTasks, removeTask, editTasks}) => {

    const [taskName, setTaskName] = useState('');

    const [dublicateCreation, setDublicateCreation] = useState({duplicate: false});

    const inputEl = useRef(null);


    const handleInputChange = (event) => {

            setTaskName(event.target.value.trim());
            
            if(!highlightDublicateCreation()) {
                
                resetDublicateCreation();
            }
    }

    const checkDublicateTasks = (tasks, name) => {

        const {unImportant, important, veryImportant} = tasks;

        if (unImportant.concat(important, veryImportant).findIndex(item => item.name === name.trim()) === -1) {
          
            return true

       } else return false;  
        
    }

    const highlightDublicateCreation = () => {

        const dublicateCreationCopy = {...dublicateCreation};

        dublicateCreationCopy.duplicate = true;

        setDublicateCreation(dublicateCreationCopy);

    }

    const resetDublicateCreation = () => {

        const dublicateCreationCopy = {...dublicateCreation};

        dublicateCreationCopy.duplicate = false;

        setDublicateCreation(dublicateCreationCopy);

    }

    const handleKeyDown = (event) => {

        if(event.key === "Enter") {

            if(checkDublicateTasks(tasks, taskName)) {

                createTask({taskName, tasksType});

                inputEl.current.blur();

                setTaskName("")         

            } else {
                highlightDublicateCreation();
            }
        }
    }

    
    return (

            <div className="task-list">

                { tasks[tasksType].length > 0 && tasks[tasksType].map((task, index) => {

                    console.log('task', task);

                    return(
                        <TaskItem key={index} 
                                  task={task} 
                                  number={index} 
                                  checked={task.checked}
                                  tasksType={tasksType}
                                  tasks = {tasks}
                                  checkDublicates={checkDublicates}
                                  checkTasks={checkTasks}
                                  removeTask={removeTask} 
                                  editTasks={editTasks}
                                  />
                    )}
                )}

                <input type="text"
                        ref={inputEl}
                        placeholder="Введите задачу"
                        name={tasksType}
                        value={taskName}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        />

                { dublicateCreation.duplicate &&
                <span className="task-list-error">Такая задача уже существует</span>}

            </div>
        );
    }


TaskList.propTypes = {
    tasks:PropTypes.object,
    tasksType:PropTypes.string,
    addNewTask:PropTypes.func,
    dublicateCreationEdit:PropTypes.bool,
    createTask:PropTypes.func,
    checkDublicateTasks:PropTypes.func
}

const mapStateToProps = (state) => {
    
    return {tasks: state.taskReducer}
}

export default connect (
    mapStateToProps,
    {createTask, checkDublicates, checkTasks, removeTask, editTasks}
)(TaskList)