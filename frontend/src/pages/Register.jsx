import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/register", formData);
      console.log("Registro bem-sucedido:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error.response?.data || error.message);
    }
  };

  const renderInput = (id, name, type, placeholder, value) => (
    <div className="sm:col-span-full">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {placeholder}
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-red-600">
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="block w-full py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  return (
    <form
      className="flex flex-col lg:w-[500px] mx-auto mt-[200px] py-12 border rounded-lg bg-red-500 px-5 gap-4 text-white"
      onSubmit={onSubmitRegister}
    >
      <h1 className="text-center text-xl font-bold">Registre-se</h1>
      {renderInput("name", "name", "text", "Digite seu nome", formData.name)}
      {renderInput("email", "email", "email", "Digite seu email", formData.email)}
      {renderInput("password", "password", "password", "Digite sua senha", formData.password)}
      <button className="bg-white text-red-500 px-4 py-2 mt-4 rounded hover:bg-gray-100" type="submit">
        Registrar
      </button>
    </form>
  );
};

export default Register;
