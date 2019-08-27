import Component from './Component.js';
import TaskItem from './TaskItem.js';

class TaskList extends Component {

    onRender(list) {
        const tasks = this.props.tasks;
        const onUpdate = this.props.onUpdate;
        
        tasks.forEach(task => {
            const taskItem = new TaskItem({ task, onUpdate });
            list.appendChild(taskItem.renderDOM());
        });

    }

    renderHTML() {
        return /*html*/`
            <ul class="task-list"></ul>
        `;
    }
}

export default TaskList;