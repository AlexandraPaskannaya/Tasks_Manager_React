
export const createTask = (data) => {

        console.log('creareTask', data);

    return {
        type: "CREATE_TASK",
        payload: data
    }
}

export const checkDublicates = (data) => {

    return{
        type: "CHECK_DUBLICATES",
        payload: data
    }
}