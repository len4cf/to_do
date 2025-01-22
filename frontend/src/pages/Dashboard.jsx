import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskList from "../components/TaskList";

const Dashboard = () => {

  const navigate = useNavigate();

  // const [userData, setUserData] = useState({
  //   userId: null,
  //   userName: '',
  //   userEmail: ''
  // });

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    user: null
  });

  const { id: userId } = useParams();
  const storedUserId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && userId === storedUserId) {
        try {
          const response = await axios.get(`http://localhost:3001/tasks/${userId}`);
          setTasks(response.data);
          setFormData(prevData => ({ ...prevData, user: userId }));
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário", error);
        }
      } else {
        navigate("/login");
      }
    };
    fetchUserData();
  }, [userId, navigate]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevData => ({ ...prevData, [name]: value }));
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3001/tasks', formData);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  return (
    <>

      <div className="flex flex-col justify-center items-center gap-10">

        <div className='text-center font-bold uppercase text-[25px]'>
          <h1 className='text-lg'>Suas tarefas</h1>
        </div>

        <TaskList tasks={tasks} />


      </div >

    </>
  );
};

export default Dashboard;
