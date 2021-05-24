export const createTask = (data) => {

    console.log('createTask', data);

    return {
        type: "CREATE_TASK",
        payload: data.payload
    }
}

export const checkDublicates = (data) => {

    return{
        type: "CHECK_DUBLICATES",
        payload: data.payload
    }
}

export const checkTasks = (data) => {
    return {
        type: 'CHECK_TASK', 
        payload: data.payload
    }
}

export const removeTask = (data) => {
    return {
        type: 'REMOVE_TASK', 
        payload: data.payload
    }
}


export const editTasks = (data) => {
    return {
        type: 'EDIT_TASK', 
        payload: data.payload
    }
}