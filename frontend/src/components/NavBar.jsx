import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";



const Navbar = () => {


  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <ul className="flex justify-between items-center mb-5">
      <Link to="/" className="lg:text-lg text-sm font-bold">
        TO DO LIST
      </Link>
      {!userId ?
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-medium text-red-600 hover:bg-red-200 hover:border-red-600 border-transparent rounded-lg lg:px-4 px-2 py-2 transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <p>|</p>
          <Link to="/register" className="text-sm font-medium text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
            Registre-se
          </Link>
        </div>
        :
        <div className="flex items-center gap-4">
          <Link className="text-sm font-bold text-red-600 hover:bg-red-200 border-transparent rounded-lg lg:px-4 px-2 py-2 transition duration-300 ease-in-out flex items-center gap-2" to={`/perfil/${userId}`}><CgProfile />Meu perfil </Link>
          <Link className="text-sm font-bold text-red-600" to={`/dashboard/${userId}`}>Minhas tarefas</Link>
          <button className="text-sm font-medium text-red-600 hover:bg-red-200 border-transparent rounded-lg lg:px-4 px-2 py-2 transition duration-300 ease-in-out flex items-center gap-2" onClick={logOut}>Deslogar
            <RiLogoutBoxRLine />
          </button>
        </div>

      }


    </ul>
  );
};

export default Navbar;
