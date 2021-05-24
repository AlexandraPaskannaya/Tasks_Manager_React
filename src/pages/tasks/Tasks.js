import {TaskList} from "../../components/taskList/TaskList";
import "./Tasks.scss";

export const TasksPage = () => {

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

                        <TaskList tasksType="unImportant"/>            
                    </div>

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-important">
                            Важные задачи
                        </div>

                        <TaskList tasksType="important"/>          
                    </div> 

                    <div className="tasks-main-col">
                        <div className="tasks-main-col-veryImportant">
                            Самые важные задачи
                        </div>
                        <TaskList tasksType="veryImportant" />          
                    </div>
                </div>
            </div>

    )
}