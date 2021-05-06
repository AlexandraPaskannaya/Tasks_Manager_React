const initialState = {
    unImportant: [],
    important: [],
    veryImportant: [],
    unImportantDublicate: false,
    importantDublicate: false,
    veryImportantDublicate: false,
}

const taskReducer = (state = initialState, action) => {

    switch(action.type) {
        case "CREATE_TASK":
            const stateCopyCreate = addTask({...state}, action.payload.tasksType, action.payload.taskName);
            
            return stateCopyCreate;

        case "CHECK_DUBLICATES":
            console.log('CHECK_DUBLICATES')
            const stateCopyDublicates = checkDublicatesType({...state}, action.payload.tasksType, action.payload.taskName);
            
            return stateCopyDublicates;

        default:
            return {...state};
    }

}

const addTask = (state, type, name) => {

    state[type].push({name: name, checked: false});

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

export default taskReducer;