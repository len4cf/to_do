import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const TaskList = ({ tasks }) => {
  const [checkedTask, setCheckedTask] = useState(null);
  const [status, setStatus] = useState("");
  const [toggleForm, setToggleForm] = useState(false)

  const userId = localStorage.getItem('userId')


  const [formData, setFormData] = useState({
    title: '',
    user: userId,
  })

  const handleCheck = (taskId, isChecked) => {
    setCheckedTask(taskId);
    setStatus(isChecked ? "completed" : "pending");
    window.location.reload();
  };

  useEffect(() => {
    if (checkedTask && status) {
      axios
        .put(`http://localhost:3001/tasks/${checkedTask}`, { status })
        .then((response) => {
          console.log("Task updated:", response.data);
        })
        .catch((err) => {
          console.error("Error updating task:", err);
        });
    }
  }, [checkedTask, status]);

  const handleDelete = async (taskId) => {
    const response = await axios.delete(`http://localhost:3001/tasks/${taskId}`)
    window.location.reload();
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmitTask = async (e) => {

    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3001/tasks", formData);
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="bg-red-500 rounded w-[400px] px-4">
      <ul className="">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`bg-slate-100 rounded font-semibold my-4 flex justify-between items-center px-4 py-2 ${task.status === "completed" ? "line-through" : ""
              }`}
          >
            <h3>{task.title}</h3>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={(e) => handleCheck(task._id, e.target.checked)}
              />
              <button onClick={() => handleDelete(task._id)}>
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="bg-slate-200 rounded p-2 my-2" onClick={() => setToggleForm(!toggleForm)}>
        {!toggleForm ? <IoMdAdd color="red" /> : <FaMinus color="red" />}
      </button>
      {toggleForm ?
        <form className="w-full flex justify-between items-center" method="POST" onSubmit={onSubmitTask}>
          <input
            type="text"
            className="bg-slate-200 my-4 w-[80%] py-2 rounded px-2"
            name="title"
            placeholder="Digite aqui a nova task"
            value={formData.title}
            onChange={handleChange} />
          <button className="bg-slate-200 text-red-700 font-bold px-2 py-2 rounded hover:bg-slate-300" >Enviar</button>
        </form> : ''
      }
    </div>
  );

};

export default TaskList;
