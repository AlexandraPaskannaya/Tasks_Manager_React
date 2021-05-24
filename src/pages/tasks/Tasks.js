import { useReducer} from "react";
import { Context } from "../../useContext"

import {TaskList} from "../../components";
import "./Tasks.scss";

const initialState = {

    tasks: {
        unImportant: [],
        important: [],
        veryImportant: [],
    },

    dublicateCreationTasks: {
        unImportant: false,
        important: false,
        veryImportant: false,
    }
};

const taskReducer = (state = initialState, action) => {

    switch(action.type) {

        case "CREATE_TASK_UNIMPORTANT":
            console.log("CREATE_TASK_UNIMPORTANT");
            const newUnimportantTask = state.tasks.unImportant.concat({name: action.payload.name, checked: false});
            return {...state, tasks: {...state.tasks, unImportant: newUnimportantTask}};
        
        case "CREATE_TASK_IMPORTANT":
            console.log("CREATE_TASK_IMPORTANT");
            const newImportantTask = state.tasks.important.concat({name: action.payload.name, checked: false});
            return {...state, tasks: {...state.tasks, important: newImportantTask}};

        case "CREATE_TASK_VERYIMPORTANT":
            console.log("CREATE_TASK_VERYIMPORTANT");
            const newVeryimportantTask = state.tasks.veryImportant.concat({name: action.payload.name, checked: false});
            return {...state, tasks: {...state.tasks, veryImportant: newVeryimportantTask}};
        
        case "CHECK_DUBLICATE_UNIMPORTANT":
            return {...state, dublicateCreationTasks: {...state.dublicateCreationTasks, unImportant: action.payload}};
    
        case "CHECK_DUBLICATE_IMPORTANT":
            return {...state, dublicateCreationTasks: {...state.dublicateCreationTasks, important: action.payload}};
    
        case "CHECK_DUBLICATE_VERYIMPORTANT":
            return {...state, dublicateCreationTasks: {...state.dublicateCreationTasks, veryImportant: action.payload}};  
                
            
        default:
            return {...state};
    }

}

export const TasksPage = () => {

    const [tasksState, dispatch] = useReducer(taskReducer, initialState);

    //const [dublicateCreation, setDublicateCreation] = useState({unImportant: false}, {important: false}, {veryImportant: false});

    //const [dublicateEdit, setDublicateEdit] = useState({unImportant: false}, {important: false}, {veryImportant: false});
    
    const fullEdit = tasksState.tasks.unImportant.concat(tasksState.tasks.important, tasksState.tasks.veryImportant);

    const onAddNewTask = (type, name) => {
        console.log("onAddNewTask", name, type);      

        if(checkDublicates(name)) {
            
            dispatch({type: `CREATE_TASK_${type.toUpperCase()}`, payload: {name, type}});

            return true;

        } else {
            //Подсветка дублика
            dispatch({type: `CHECK_DUBLICATE_${type.toUpperCase()}`, payload: true});

            return false;

        }
    }

    const checkDublicates = (name) => {

        const {unImportant, important, veryImportant} = tasksState.tasks;

        if(unImportant.concat(important, veryImportant).findIndex(item => item.name === name.trim()) === -1){

            return true;

        } else {
            return false;
        }

    }

    const resetDublicateCreation = (type) => {

            dispatch({type: `CHECK_DUBLICATE_${type.toUpperCase()}`, payload: false});

    }

    const checkDublicatesEdit = (editTask, fullEdit) => {

        /*if (fullEdit.filter(item => item.name === editTask.name).length > 1) {
          
            return false

       } else {
            
            return true;  
        } */ 

    }


    const resetDublicateEdit = (type) => {

        /*const dublicateEditCopy = {...dublicateEdit};

        dublicateEditCopy[type] = false;

        setDublicateEdit(dublicateEditCopy);*/

    }

    const highlightDublicates = (type) => {

       /*const dublicateEditCopy = {...dublicateEdit};

        dublicateEditCopy[type] = true;
        
        setDublicateEdit(dublicateEditCopy);*/
    }

    const handleCheckStatus = (type, index, checked) => {

        /*const tasksCopy = {...tasks};
        
        tasksCopy[type][index].checked = checked;

        console.log("inputTasksCopy", tasksCopy);

        setTasks(tasksCopy);*/

    }

    const removeTasks = (type, index) => {

        /*const tasksCopy = {...tasks};

        tasksCopy[type].splice(index, 1);

        setTasks(tasksCopy);*/
    }

    const editTasks = (task,  index, tasksType, editTask) => {

        /*if(!task.checked) {

            const tasksCopy = {...tasks};

            if(task.name === editTask.name) {

                return true;

            } else {

                tasksCopy[tasksType].splice(index, 1, editTask);

                setTasks(tasksCopy);
            }
           
        } else return;*/
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

                        <TaskList tasks={tasksState.tasks.unImportant}
                                tasksType="unImportant"
                                addNewTask={onAddNewTask}
                                dublicateCreation={tasksState.dublicateCreationTasks.unImportant}
                                resetDublicate={resetDublicateCreation}
                                />          
                    </div>

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-important">
                            Важные задачи
                        </div>

                        <TaskList tasks={tasksState.tasks.important}
                                tasksType="important"
                                addNewTask={onAddNewTask}
                                dublicateCreation={tasksState.dublicateCreationTasks.important}
                                resetDublicate={resetDublicateCreation}
                                />          
                    </div> 

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-veryImportant">
                            Самые важные задачи
                        </div>
                        <TaskList tasks={tasksState.tasks.veryImportant}
                                tasksType="veryImportant"
                                addNewTask={onAddNewTask} 
                                dublicateCreation={tasksState.dublicateCreationTasks.veryImportant}
                                resetDublicate={resetDublicateCreation}
                                />          
                    </div>
                </div>
            </div>
        </Context.Provider>

    )
}