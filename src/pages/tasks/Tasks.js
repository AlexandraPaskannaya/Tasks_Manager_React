import {useState} from "react";
import { Context } from "../../useContext"

import TaskList from "../../components/taskList/TaskList";
import "./Tasks.scss";

export const TasksPage = () => {

    const [tasks, setTasks] = useState({unImportant: [], important: [], veryImportant: []});

    const [dublicateCreation, setDublicateCreation] = useState({unImportant: false}, {important: false}, {veryImportant: false});

    const onAddNewTask = (name, type) => {
        console.log("onAddNewTask", name, type);

        const tasksCopy = {...tasks};

        const {unImportant, important, veryImportant} = tasksCopy;

        if(!checkDublicates(unImportant.concat(important, veryImportant), name)) {
            
            tasksCopy[type].push({ name, checked: false});

            console.log("onAddNewTask", tasksCopy);

            setTasks(tasksCopy);

            setDublicateCreation('');

            return true;

        } else {
            //Подсветка дублика
            
            const dublicateCreationCopy = {...dublicateCreation};
            
            dublicateCreationCopy[type] = true;

            setTasks(tasksCopy);
            setDublicateCreation(dublicateCreationCopy);

            return false;

        }
    }

    const checkDublicates = (tasks, name) => {

        const index = tasks.findIndex(task => task.name === name);

        return index !== -1;

    }


    const handleCheckStatus = (type, index, checked) => {

        const tasksCopy = {...tasks};
        
        tasksCopy[type][index].checked = checked;

        console.log("inputTasksCopy", tasksCopy);

        setTasks(tasksCopy);

    }

    const removeTasks = (type, index) => {

        const tasksCopy = {...tasks};

        tasksCopy[type].splice(index, 1);

        setTasks(tasksCopy);
    }

    const editTasks = (task,  index, tasksType, editTask) => {

        if(!task.checked) {

            const tasksCopy = {...tasks};

            if(task.name === editTask.name) {

                return true;

            } else {

                tasksCopy[tasksType].splice(index, 1, editTask);

                setTasks(tasksCopy);
            }
           
        } else return;
    }

    const contextValue = {
        handleCheckStatus, 
        removeTasks, 
        editTasks, 
        checkDublicates
    }

    return (
        <Context.Provider value = {contextValue}>
            <div className="tasks">

                    <div className="tasks-header">
                        Планер задач
                    </div>

                <div className="tasks-main">
                    <div className="tasks-main-col">
                        <div className="tasks-main-col-unImportant">
                            Неважные задачи
                        </div>

                        <TaskList 
                                tasksType="unImportant"
                                addNewTask={onAddNewTask}
                                dublicateCreation={dublicateCreation.unImportant}
                                />          
                    </div>

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-important">
                            Важные задачи
                        </div>

                        <TaskList 
                                tasksType="important"
                                addNewTask={onAddNewTask}
                                dublicateCreation={dublicateCreation.important} />          
                    </div> 

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-veryImportant">
                            Самые важные задачи
                        </div>
                        <TaskList 
                                tasksType="veryImportant"
                                addNewTask={onAddNewTask} 
                                dublicateCreation={dublicateCreation.veryImportant}/>          
                    </div>
                </div>
            </div>
        </Context.Provider>

    )
}