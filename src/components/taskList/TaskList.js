import PropTypes from "prop-types";
import {useState, useRef} from "react";
import {connect} from "react-redux";

import {createTask, checkDublicates} from "../../redux/actions/taskActions";
import {TaskItem} from "../taskItem/TaskItem";
import "./TaskList.scss";

const TaskList = ({tasks, tasksType, addNewTask, dublicateCreation, createTask, checkDublicates}) => {

    const [taskName, setTaskName] = useState('');

    const inputEl = useRef();

    const handleInputChange = (event) => {

            setTaskName(event.target.value.trim());
            
    }

    const handleKeyDown = (event) => {

        if(event.key === "Enter") {

            //if(addNewTask(taskName, tasksType)) {

                //inputEl.current.blur();

                //console.log("handleKeyDown", taskName, tasksType);

                //setTaskName("");           
                checkDublicates({taskName, tasksType});

                createTask({taskName, tasksType});

                setTaskName("")

            } //else {

                //setTaskName("");  
                //return

            //}
        //}
    }

    console.log('tasks', tasks);

    return (

            <div className="task-list">

                {tasks[tasksType] && tasks[tasksType].length > 0 && tasks[tasksType].map((task, index) => {

                    console.log('task', task);
                    
                    return(
                        <TaskItem key={index} 
                                  task={task} 
                                  number={index} 
                                  checked={task.checked}
                                  type={tasksType}/>
                    )
                })}

                <input type="text"
                        ref={inputEl}
                        placeholder="Введите задачу"
                        name={tasksType}
                        value={taskName}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} />

                {
                ((tasksType === "unImportant" && tasks.unImportantDublicate) ||
                (tasksType === "important" && tasks.importantDublicate) ||
                (tasksType === "veryImportant" && tasks.veryImportantDublicate))
                &&
                <span className="task-list-error">Такая задача уже существует</span>}
                

            </div>
    );
}

TaskList.propTypes = {
    tasksType:PropTypes.string,
    dublicateCreation: PropTypes.bool,
    addNewTask:PropTypes.func,
    tasks:PropTypes.object,
    createTask:PropTypes.func,
    checkDublicates:PropTypes.func
};

const mapStateToProps = (state) => {
    
    return {tasks: state.taskReducer}
}

export default connect (
    mapStateToProps,
    {createTask, checkDublicates},
)(TaskList);