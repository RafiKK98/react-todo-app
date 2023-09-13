import {useState} from "react";

export const TaskFrom = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onAdd(taskName);
        setTaskName('');
    }

    return (
        <form onSubmit={event => handleSubmit(event)}>
            <button>+</button>
            <input type="text"
                   value={taskName}
                   onChange={event => setTaskName(event.target.value)}
                   placeholder="Your next task..."
            />
        </form>
    )
}