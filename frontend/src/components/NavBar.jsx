import { Link, useNavigate } from "react-router-dom";

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
          <Link className="text-sm font-bold text-red-600" to={`/dashboard/${userId}`}>Minhas tarefas</Link>
          <button className="text-sm font-medium text-red-600 hover:bg-red-200 hover:border-red-600 border-transparent rounded-lg lg:px-4 px-2 py-2 transition duration-300 ease-in-out flex items-center gap-3" onClick={logOut}>Deslogar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>

      }


    </ul>
  );
};

export default Navbar;
