const initialState = {
    unImportant: [],
    important: [],
    veryImportant: [],
}

const taskReducer = (state = initialState, action) => {

    switch(action.type) {
        case "CREATE_TASK":
            console.log('CREATE_TASK')
            const stateCopyCreate = addTask({...state}, action.payload.tasksType, action.payload.taskName);
            
            return stateCopyCreate;

        case "CHECK_DUBLICATES":
            console.log('CHECK_DUBLICATES')
            const stateCopyDublicates = checkDublicatesType({...state}, action.payload.tasksType, action.payload.taskName);
            
            return stateCopyDublicates;

        case 'CHECK_TASK': 
            console.log('CHECK_TASK') 
            const stateCopyCheck = checkTasks({...state}, action.payload.tasksType, action.payload.number)
            
            return stateCopyCheck; 

         case 'REMOVE_TASK':
            const stateCopyDelete = removeTask ({...state}, action.payload.tasksType, action.payload.number)
            return stateCopyDelete;  

        case 'EDIT_TASK':
            const stateCopyEdit = editTasks ({...state}, action.payload.tasksType, action.payload.number, action.payload.task, action.payload.editTaskCopy)
            return stateCopyEdit; 

        default:
            return {...state};
    }

}

const addTask = (state, type, name) => {

    state[type].push({name: name, checked: false});

    return state;
}

const checkTasks = (state, type, number) => {

    state[type][number].checked = !state[type][number].checked;

    return state;
}

const checkDublicatesType = (state, type, name) => {
    
    const {unImportant, important, veryImportant} = state;

    const index = unImportant.concat(important, veryImportant).concat().findIndex(task => task.name === name);

    if(index !== -1) {

        if(type === "unImportant") {

            state.unImportantDublicate = true;

            state.importantDublicate = false;
            state.veryImportantDublicate = false;
            
        } else if (type === "important") {

            state.importantDublicate = true;

            state.unImportantDublicate = false;
            state.veryImportantDublicate = false;

        } else {

            state.veryImportantDublicate = true;

            state.importantDublicate = false;
            state.unImportantDublicate = false;
        }
    }
    return state;
}

const removeTask = (state, type, number) => {

    state[type].splice(number, 1);

    return state;
}



const editTasks = (state, type, number, task, editTask) => {
  
    if(!task.checked) {
        
        if(task.name === editTask.name) return;

        else {                        
            
            state[type].splice(number, 1, editTask);

            return state;
        }      

    } else return 
  
}



export default taskReducer;