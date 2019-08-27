import Component from './Component.js';


class TaskItem extends Component {

    renderHTML() {
        const task = this.props.task;

        return /*html*/`
        <li class="task">
            <span class="${task.completed ? 'complete' : ''}">${task.name}</span>
            <button class="completed-button">
                ⦻
            </button>
        </li>
        `;
    }
}

export default TaskItem;