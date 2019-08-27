import Component from './Component.js';


class TaskForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=task]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const taskToAdd = {
                name: input.value,
                completed: false
            };

            error.textContent = '';

            onAdd(taskToAdd)
                .them(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }

    renderHTML() {
        return /*html*/`
            <section class="task-form-section">
                <form class="type-form">
                    <input name="task" required>
                    <button>Add</button>
                </form>
            </section>
        `;
    }
}

export default TaskForm; 