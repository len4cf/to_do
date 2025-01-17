import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Usando o hook useNavigate

const Dashboard = () => {

  const navigate = useNavigate(); // Hook de navegação
  const [userData, setUserData] = useState({
    userId: null,
    userName: '',
    userEmail: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    user: null
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        try {
          const response = await axios.get(`http://localhost:3001/users/${storedUserId}`);
          setUserData({
            userId: storedUserId,
            userName: response.data.name,
            userEmail: response.data.email
          });
          setFormData(prevData => ({ ...prevData, user: storedUserId }));
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário", error);
        }
      } else {
        navigate("/login"); // Usando navigate para redirecionar
      }
    };
    fetchUserData();
  }, [navigate]); // O efeito roda apenas uma vez ao carregar o componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/tasks', formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("userId");
    navigate("/login"); // Redireciona para login após deslogar
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Bem-vindo {userData.userName}</h2>
      <h3>Email: {userData.userEmail}</h3>

      <button onClick={logOut}>Deslogar</button>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Título da task"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Descrição da task"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <button type="submit">Criar task</button>
      </form>
    </>
  );
};

export default Dashboard;
