import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../../useContext"

import "./TaskItem.scss"

export const TaskItem = ({task, number, tasksType}) => {

    const {handleCheckStatus, removeTasks, editTasks} = useContext(Context);
    //const [editText, seteditText] = useState({name: '', checked: false});
   
    return (
        <div className="task-item">

            <input type="checkbox" 
                    checked={task.checked}
                    onChange={(event) => handleCheckStatus(tasksType, number, event.target.checked)}/>
            
           
            <span>{task.name}</span>
           

            {!task.checked && 
            <i className="fas fa-edit" alt='edit'
            onClick={() =>  console.log("edit")}></i>
            }

            {task.checked && 
            <i className="fas fa-trash-alt" alt='trash'
             onClick={() => removeTasks(tasksType, number)}></i>
             
            }
        </div>
    );
}

TaskItem.propTypes = {
    task:PropTypes.object,
    tasksType:PropTypes.string,
    number:PropTypes.number
};