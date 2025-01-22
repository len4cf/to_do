import { Link } from "react-router-dom"
import to_do from "../to_do.png"

const Home = () => {

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center px-8 lg:py-16 py-4 gap-4">
        <div className="text-left flex flex-col lg:items-start items-center">
          <h1 className="lg:text-[70px] font-bold text-[30px] lg:py-0 pt-8 pb-3">Organize sua vida</h1>
          <p className="lg:text-[30px] text-[20px]">Simplifique a sua vida e a da sua equipe com o gerenciador de tarefas e app de to do list nº 1 do mundo.</p>
          <Link to="/register" className="text-sm mt-5 font-medium text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
            Comece de graça
          </Link>
        </div>
        <img className="lg:w-[900px] w-[500px]" src={to_do} />
      </div>
    </>
  )

}

export default Home