import {useState} from "react";
import { Context } from "../../useContext"

import {TaskList} from "../../components";
import "./Tasks.scss";

export const TasksPage = () => {

    const [tasks, setTasks] = useState({unImportant: [], important: [], veryImportant: []});

    const [dublicateCreation, setDublicateCreation] = useState({unImportant: false}, {important: false}, {veryImportant: false});

    const [dublicateEdit, setDublicateEdit] = useState({unImportant: false}, {important: false}, {veryImportant: false});
    
    const fullEdit = tasks.unImportant.concat(tasks.important, tasks.veryImportant);

    const onAddNewTask = (type, name) => {
        console.log("onAddNewTask", name, type);

        const tasksCopy = {...tasks};

        if(checkDublicates(name)) {
            
            tasksCopy[type].push({name: name.trim(), checked: false});

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

    const checkDublicates = (name) => {

        if(fullEdit.findIndex(item => item.name === name.trim()) === -1){

            return true;

        } else {
            return false;
        }

    }

    const checkDublicatesEdit = (editTask, fullEdit) => {

        if (fullEdit.filter(item => item.name === editTask.name).length > 1) {
          
            return false

       } else {
            
            return true;  
        }  

    }

    const resetDublicateCreation = (type) => {

        const dublicateCreationCopy = {...dublicateCreation};

        dublicateCreationCopy[type] = false;

        setDublicateCreation(dublicateCreationCopy);

    }

    const resetDublicateEdit = (type) => {

        const dublicateEditCopy = {...dublicateEdit};

        dublicateEditCopy[type] = false;

        setDublicateEdit(dublicateEditCopy);

    }

    const highlightDublicates = (type) => {

        const dublicateEditCopy = {...dublicateEdit};

        dublicateEditCopy[type] = true;
        
        setDublicateEdit(dublicateEditCopy);
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


    return (
        <Context.Provider value = {{handleCheckStatus, removeTasks, editTasks, checkDublicates, resetDublicateEdit, checkDublicatesEdit, highlightDublicates, fullEdit}}>
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
                                resetDublicate={resetDublicateCreation}
                                dublicateCreationEdit={dublicateEdit.unImportant}
                                />          
                    </div>

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-important">
                            Важные задачи
                        </div>

                        <TaskList tasks={tasks.important}
                                tasksType="important"
                                addNewTask={onAddNewTask}
                                dublicateCreation={dublicateCreation.important}
                                resetDublicate={resetDublicateCreation}
                                dublicateCreationEdit={dublicateEdit.important} />          
                    </div> 

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-veryImportant">
                            Самые важные задачи
                        </div>
                        <TaskList tasks={tasks.veryImportant}
                                tasksType="veryImportant"
                                addNewTask={onAddNewTask} 
                                dublicateCreation={dublicateCreation.veryImportant}
                                resetDublicate={resetDublicateCreation}
                                dublicateCreationEdit={dublicateEdit.veryImportant}/>          
                    </div>
                </div>
            </div>
        </Context.Provider>

    )
}