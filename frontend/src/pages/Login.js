import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [mensagem, setMensagem] = useState('')
  const [userId, setUserId] = useState(null); // Estado para armazenar o userId
  const navigate = useNavigate()

  const onSubmitLogin = async (e) => {

    e.preventDefault(); // Evita o comportamento padrão de submissão do formulário

    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      setMensagem(response.data.message)
      setUserId(response.data.userId);
      localStorage.setItem("userId", response.data.userId);
      navigate('/dashboard');
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  };

  return (
    <>
      <div className='flex justify-center mt-7'>
        <h1 className="bold">Login</h1>
        <form onSubmit={onSubmitLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Endereço de email:</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email" value={formData.email} onChange={handleChange} name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Digite sua senha" value={formData.password} onChange={handleChange} name="password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>

  )

}

export default Login;