import Component from './Component.js';
import TaskList from './TaskList.js';
import { getTasks, addTask, updateTask } from '../services/todo-api.js';
import TaskForm from './TaskForm.js';

class TODOList extends Component {

    onRender(dom) {

        const main = dom.querySelector('main');

        const taskForm = new TaskForm({
            onAdd: task => {
                return addTask(task)
                    .then(saved => {
                        const tasks = this.state.tasks;
                        tasks.push(saved);
                        taskList.update({ tasks });
                    });
            }
        });
        main.appendChild(taskForm.renderDOM());

        const taskList = new TaskList({
            tasks: [],
            onUpdate: task => {
                return updateTask(task)
                    .then(updated => {
                        const tasks = this.state.tasks;

                        const index = tasks.indexOf(task);
                        tasks.splice(index, 1, updated);

                        taskList.update({ tasks });
                    });
            }
        });
        main.appendChild(taskList.renderDOM());

        getTasks()
            .then(tasks => {
                this.state.tasks = tasks;
                taskList.update({ tasks });
            });

    }

    renderHTML() {
        return /*html*/`
            <div>

                <main></main>
            </div>
        `;
    }
}

export default TODOList;