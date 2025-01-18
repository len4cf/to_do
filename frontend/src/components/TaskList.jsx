import { useEffect, useState } from "react";

const TaskList = ({ tasks }) => {

  const [checkedTask, setCheckedTask] = useState(null);
  const [status, setStatus] = useState('');

  const handleCheck = (taskId, e) => {
    if (e.target.checked) {
      setCheckedTask(taskId);
      setStatus('completed');
    } else {
      setCheckedTask(taskId);
      setStatus('pending');
    }
  };

  useEffect(() => {
    if (checkedTask && status) {
      axios.put(`http://localhost:3001/tasks/${checkedTask}`, { status })
        .then((response) => {
          console.log('Task updated:', response.data);
        })
        .catch((err) => {
          console.error('Error updating task:', err);
        });
    }
  }, [checkedTask, status]);


  return (
    <div className="bg-red-500 w-[400px]">
      <ul className="px-4 py-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-slate-300 my-4 flex justify-between items-center px-4 py-2"
          >
            <h3>{task.title}</h3>
            <input
              type="checkbox"
              onChange={(e) => handleCheck(task._id, e)}
            />
          </li>
        ))}
      </ul>
    </div>
  );

}

export default TaskList