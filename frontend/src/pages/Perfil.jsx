import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"

const Perfil = () => {

  const { id } = useParams()
  const userId = localStorage.getItem("userId")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [edit, setEdit] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: password
  })

  useEffect(() => {
    if (userId && id === userId) {
      axios.get(`http://localhost:3001/users/${id}`)
        .then((response) => {
          setFormData(response.data)
          setName(response.data.name)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClick = () => {
    setEdit(!edit)
    setDisabled(!disabled)
  }

  const onSubmitEdit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(`http://localhost:3001/users/${userId}`, formData)
      setEdit(!edit)
      setDisabled(!disabled)
      window.location.reload()
    } catch (err) {
      console.error(err)
    }

  }

  return (
    <div>
      <h1 className="text-center text-lg">Olá, {name}</h1>
      <div className="flex justify-end">
        <button className={`text-right bg-${edit ? `slate` : `red`}-500 py-2 px-4 rounded text-white font-bold text-sm`} onClick={handleClick}>Editar</button>
      </div>
      <form onSubmit={onSubmitEdit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-4">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Username</label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input type="text" name="name" id="name" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" value={formData.name} disabled={disabled} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input type="text" name="email" id="email" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" value={formData.email} disabled={disabled} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input type="password" name="password" id="password" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" value={formData.password} disabled={disabled} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
            {edit ?
              <div className="flex justify-end pt-12">
                <button className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded text-white font-bold text-sm" type="submit">Salvar</button>
              </div>
              : ''}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Perfil