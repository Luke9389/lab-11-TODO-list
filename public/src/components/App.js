import Component from './Component.js';
import TaskList from './TaskList.js';
import { getTasks, addTask } from '../services/todo-api.js';
import TaskForm from './TaskForm.js';

class TODOList extends Component {

    onRender(dom) {

        const main = dom.querySelector('main');

        const taskForm = new TaskForm({
            onAdd: task => {
                console.log('task in app', task);
                return addTask(task)
                    .then(saved => {
                        console.log('saved', saved);
                        const tasks = this.state.tasks;
                        tasks.push(saved);
                        taskList.update({ tasks });
                    });
            }
        });
        main.appendChild(taskForm.renderDOM());

        const taskList = new TaskList({
            tasks: []
        });
        main.appendChild(taskList.renderDOM());

        getTasks()
            .then(tasks => {
                this.state.tasks = tasks;
                console.log(tasks);
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