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
  const navigate = useNavigate()

  const onSubmitLogin = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      setMensagem(response.data.message)
      localStorage.setItem("userId", response.data.userId);
      const userId = localStorage.getItem("userId")
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      setMensagem(error.response.data.message);
    }
  };

  return (
    <>
      <form className="flex flex-col lg:w-[500px] mx-auto mt-[200px] py-12 border rounded-lg bg-red-500 px-5 gap-2 text-white" onSubmit={onSubmitLogin}>
        <h1 className="text-center">Login</h1>
        <div className="sm:col-span-4">
          <label htmlFor="exampleInputEmail1" className="block text-sm/6 font-medium text-white">
            Email
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-600">
              <input
                id="exampleInputEmail1"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="text"
                placeholder="Digite seu email"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-full">
          <label htmlFor="exampleInputPassword1" className="block text-sm/6 font-medium text-white">
            Senha
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-600">
              <input
                id="exampleInputPassword1"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <button className="bg-white text-red-500 px-4 py-2 mt-4 rounded" type="submit">Login</button>
      </form>
    </>

  )


}

export default Login;
