import { RefObject, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Register() {
  const [enviar, setEnviar] = useState<false | true>()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const inputNameRef: RefObject<HTMLInputElement> = useRef(null)
  const inputEmailRef: RefObject<HTMLInputElement> = useRef(null)
  const inputPasswordRef: RefObject<HTMLInputElement> = useRef(null)
  const inputConfirmPasswordRef: RefObject<HTMLInputElement> = useRef(null)

  const router = useRouter()

  useEffect(() => {
    setError('')
    setSuccess('')
    if (enviar === true) {
      axios
        .post('https://servidor-da-tela-de-cadastro.vercel.app/registrar', {
          name: inputNameRef.current!.value,
          email: inputEmailRef.current!.value,
          senha: inputPasswordRef.current!.value,
          confirmarSenha: inputConfirmPasswordRef.current!.value,
        })
        .then((response) => {
          setSuccess('conta criada com sucesso')
          router.push('/')
        })
        .catch((error) => {
          setError(error.response.data.error)
        })
    }
    setEnviar(false)
  }, [enviar, router])

  const handleShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }
  return (
    <section className="background flex h-screen w-screen items-center justify-center">
      <div className="vidro absolute h-screen w-screen"></div>
      <div className="z-10 h-[600px] w-[60vw] rounded-md bg-white tabletMini:w-[80vw] phone:w-[89vw]">
        <section className="register flex h-[600px] w-[60vw] items-center justify-center rounded-lg bg-neutral-100  tabletMini:w-[80vw] phone:w-[89vw]">
          <form action="#" className="animation-aparecer flex flex-col">
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-6 text-2xl font-bold uppercase text-green-400">
                Crie sua Conta
              </h1>
              <p className="text-red-800">{error}</p>
              <p className="font-bold text-green-300">{success}</p>
            </div>
            <label htmlFor="Nome_de_usuario" className="font-medium">
              Nome de usuário
            </label>
            <input
              ref={inputNameRef}
              className="input mb-2 rounded-md py-2 pl-3 "
              type="text"
              placeholder="Nome de usuário"
            />
            <label htmlFor="Email" className="font-medium">
              Email
            </label>
            <input
              ref={inputEmailRef}
              className="input mb-2 rounded-md py-2 pl-3 "
              type="text"
              placeholder="Email"
            />
            <label htmlFor="Senha" className="font-medium">
              Senha
            </label>
            <div className="relative flex">
              <input
                ref={inputPasswordRef}
                className="input mb-2 flex-1 rounded-md py-2 pl-3 "
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
              />
              <span
                onClick={handleShowPassword}
                className="absolute right-2 top-[43%] h-7 w-7 translate-y-[-50%] cursor-pointer"
              >
                <div
                  className={`${
                    showPassword ? 'image-eye-slash' : 'image-eye'
                  } h-7 w-7`}
                ></div>
              </span>
            </div>
            <label htmlFor="Confirmar_senha" className="font-medium">
              Confirmar senha
            </label>
            <input
              ref={inputConfirmPasswordRef}
              className="input mb-2 rounded-md py-2 pl-3 "
              type="password"
              placeholder="Confirmar senha"
            />
            <p className="w-[300px] text-sm">
              Ao se registrar, você está aceitando nossos{' '}
              <a href="#" className="text-green-200">
                termos de uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-green-200">
                política de privacidade.
              </a>
            </p>
            <button
              onClick={() => setEnviar(true)}
              type="submit"
              className="buttons mt-4 rounded-md bg-green-300 py-2 font-bold text-gray-100 transition-colors hover:bg-green-400"
            >
              Registre-se
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}
