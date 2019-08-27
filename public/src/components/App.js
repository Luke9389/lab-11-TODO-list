import Component from './Component.js';
import TaskList from './TaskList.js';
import { getTasks } from '../services/todo-api.js';

class TODOList extends Component {

    onRender(dom) {

        const main = dom.querySelector('main');

        const taskList = new TaskList({
            tasks: []
        });
        main.appendChild(taskList.renderDOM());

        getTasks()
            .then(tasks => {
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