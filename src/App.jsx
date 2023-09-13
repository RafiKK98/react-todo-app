import './App.css'
import {TaskFrom} from "./TaskForm/TaskFrom";
import {Task} from "./Task/Task";
import {useEffect, useState} from "react";

function App() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tasks.length === 0) return;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks')));
    }, []);

    function addTask(name) {
        setTasks(prevState => {
            return [...prevState, {name: name, done: false}]
        })
    }

    function removeTask(taskIndex) {
        setTasks(prevState => {
            return prevState.filter((taskObject, index) => index !== taskIndex)
        });
    }

    function updateTaskDone(taskIndex, newDone) {
        setTasks(prevState => {
            const newTasks = [...prevState];
            newTasks[taskIndex].done = newDone;
            return newTasks;
        })
    }

    const numberOfCompletedTasks = tasks.filter((task) => task.done).length;
    const numberOfTotalTasks = tasks.length;

    function getMessage() {
        const percentage = (numberOfCompletedTasks / numberOfTotalTasks) * 100;
        if (percentage === 0) {
            return 'Try to do at least one! 🙏🏽';
        }
        if (percentage === 100) {
            return 'Nice job for today! 👍🏽';
        }
        return 'Keep it going 💪🏽';
    }

    function renameTask(index, newName) {
        setTasks(prevState => {
            const newTasks = [...prevState]
            newTasks[index].name = newName;
            return newTasks;
        })
    }

    return (
        <main>
            <h1>{numberOfCompletedTasks}/{numberOfTotalTasks} Complete</h1>
            <h2>{getMessage()}</h2>
            <TaskFrom onAdd={name => addTask(name)} />
            {
                tasks.map((task, index) => (
                    <Task {...task}
                          onToggle={done => updateTaskDone(index, done)}
                          onTrash={() => removeTask(index)}
                          onRename={newName => renameTask(index, newName)}
                    />
                ))
            }
        </main>
    )
}

export default App
