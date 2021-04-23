import PropTypes from "prop-types";

import "./TaskItem.scss"

export const TaskItem = ({task, number}) => {
	// {handleCheckStatus && <i className="fas fa-trash-alt"></i>}

    return (
        <div className="task-item">

            <input type="checkbox"  />

            {task.name}
            
            <i className="fas fa-edit"></i>
        </div>
    );
}

TaskItem.propTypes = {
    task:PropTypes.object,
    number:PropTypes.number
};