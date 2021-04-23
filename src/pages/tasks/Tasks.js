import {useState} from "react";

import {TaskList} from "../../components";
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


    /*const handleCheckStatus = (event, name) => {

        const tasksCopy = [...tasks];

        const index = tasksCopy.findIndex((el, i) => el.name === name);
        
        tasksCopy[index].checked = event.target.checked;

        console.log("inputTasksCopy", tasksCopy);

        setTasks(tasksCopy);

    }*/

    return (

        <div className="tasks">

            <div className="tasks-header">
                Планер задач
            </div>

        <div className="tasks-main">
            <div className="tasks-main-col">
                <div className="tasks-main-col-unImportant">
                    Неважные задачи
                </div>

                <TaskList tasks={tasks.unImportant}
                          tasksType="unImportant"
                          addNewTask={onAddNewTask}
                          dublicateCreation={dublicateCreation.unImportant}
                          />          
            </div>

            <div className="tasks-main-col">
                <div className="tasks-main-col-important">
                    Важные задачи
                </div>

                <TaskList tasks={tasks.important}
                          tasksType="important"
                          addNewTask={onAddNewTask}
                          dublicateCreation={dublicateCreation.important} />          
            </div> 

            <div className="tasks-main-col">
                <div className="tasks-main-col-veryImportant">
                    Самые важные задачи
                </div>
                <TaskList tasks={tasks.veryImportant}
                          tasksType="veryImportant"
                          addNewTask={onAddNewTask} 
                          dublicateCreation={dublicateCreation.veryImportant}/>          
            </div>
        </div>

        </div>

    )

}