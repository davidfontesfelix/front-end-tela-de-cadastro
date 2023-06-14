import PencilLine from '../../assets/icons/pencil-line.svg'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ConfigsUser() {
  const router = useRouter()
  const id = router.query.id

  const [editModeName, setEditModeName] = useState(false)
  const [editModeEmail, setEditModeEmail] = useState(false)
  const [editModeSenha, setEditModeSenha] = useState(false)

  const [showComfirm, setShowComfirm] = useState(false)
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputSenha, setInputSenha] = useState('')

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://servidor-da-tela-de-cadastro.vercel.app/users/${id}`,
      )

      setInputName(response.data.name)
      setInputEmail(response.data.email)
      setInputSenha(response.data.senha)
    } catch {}
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const save = () => {
    axios
      .put(
        `https://servidor-da-tela-de-cadastro.vercel.app/user/changes/${id}?name=${inputName}&senha=${inputSenha}&email=${inputEmail}`,
      )
      .then(() => {
        router.push('/')
      })
  }

  const editButton = (editMode: any, setEditMode: any) => {
    if (editMode === false) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }

  const deleteUser = () => {
    axios.delete(`
      https://servidor-da-tela-de-cadastro.vercel.app/user/delete/${id}
    `)

    router.push('/')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="vidro absolute h-screen w-screen"></div>
      <div className="z-10 h-[600px] w-[60vw] rounded-md bg-neutral-100 tablet:w-[75vw] tabletMini:w-[80vw] phone:w-[89vw]">
        <header className="flex flex-col items-center">
          <h1 className="mt-5 text-5xl">Usuário</h1>
          <h2 className="text-xl">configurações</h2>
          <div className="mt-4 h-[2px] w-[95%] bg-black"></div>
        </header>
        <section>
          <ul className="mx-6 mt-4 flex flex-col gap-5">
            <li className="relative rounded-lg bg-green-100">
              <div className="flex gap-1 px-2 py-4">
                <h3 className="font-bold">Nome de usuário:</h3>
                {editModeName ? (
                  <input
                    type="text"
                    className=" w-2/4 cursor-default rounded-md px-2 focus:outline-none phone:w-[30%]"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                  />
                ) : (
                  <p className="px-2">{inputName}</p>
                )}
                <div className="absolute right-4 ">
                  <div
                    onClick={() => editButton(editModeName, setEditModeName)}
                    className="h-6 w-6 cursor-pointer rounded-sm"
                  >
                    <PencilLine />
                  </div>
                </div>
              </div>
            </li>
            <li className="relative rounded-lg bg-green-100">
              <div className="flex gap-1 px-2 py-4">
                <h3 className="font-bold">Email:</h3>
                {editModeEmail ? (
                  <input
                    type="text"
                    className=" w-2/4 cursor-default rounded-md px-2 focus:outline-none phone:w-[30%]"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                  />
                ) : (
                  <p className="px-2">{inputEmail}</p>
                )}
                <div className="absolute right-4 ">
                  <div
                    onClick={() => editButton(editModeEmail, setEditModeEmail)}
                    className="h-6 w-6 cursor-pointer rounded-sm"
                  >
                    <PencilLine />
                  </div>
                </div>
              </div>
            </li>
            <li className="relative rounded-lg bg-green-100">
              <div className="flex gap-1 px-2 py-4">
                <h3 className="font-bold">Senha:</h3>
                {editModeSenha ? (
                  <input
                    type="text"
                    className=" w-2/4 cursor-default rounded-md px-2 focus:outline-none phone:w-[30%]"
                    value={inputSenha}
                    onChange={(e) => setInputSenha(e.target.value)}
                  />
                ) : (
                  <p className="px-2">{inputSenha}</p>
                )}
                <div className="absolute right-4 ">
                  <div
                    onClick={() => editButton(editModeSenha, setEditModeSenha)}
                    className="h-6 w-6 cursor-pointer rounded-sm"
                  >
                    <PencilLine />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="mr-6 mt-48 flex justify-end gap-4">
            <button
              onClick={(e) => setShowComfirm(true)}
              className="buttons flex rounded-md bg-red-600 px-4 py-2 text-white"
            >
              Deletar
            </button>
            <button
              onClick={(e) => save()}
              className="buttons flex rounded-md bg-green-400 px-4 py-2 text-white"
            >
              Salvar
            </button>
          </div>
        </section>
      </div>
      {showComfirm ? (
        <div className="absolute z-50 flex h-screen w-screen items-center justify-center bg-black/60">
          <div className="flex h-[15vh] w-[50vw] flex-col items-center rounded-lg bg-gray-50">
            <span className="mt-5 text-lg font-bold">Deseja confirmar?</span>
            <div className="mt-10 flex gap-5">
              <button
                onClick={() => setShowComfirm(false)}
                className="buttons rounded-md bg-red-600 px-4 py-2 text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteUser()}
                className="buttons rounded-md bg-green-400 px-4 py-2 text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
