import Component from './Component.js';


class TaskItem extends Component {

    onRender(dom) {
        const task = this.props.task;
        const onUpdate = this.props.onUpdate;

        const completedButton = dom.querySelector('.completed-button');
        completedButton.addEventListener('click', () => {
            task.completed = !task.completed;
            onUpdate(task);
        });
    }

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