import { RefObject, useEffect, useRef, useState } from 'react'
import axios from 'axios'

interface RegisterProps {
  animation: any
}

export default function Register(props: RegisterProps) {
  const [enviar, setEnviar] = useState<false | true>(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const inputNameRef: RefObject<HTMLInputElement> = useRef(null)
  const inputEmailRef: RefObject<HTMLInputElement> = useRef(null)
  const inputPasswordRef: RefObject<HTMLInputElement> = useRef(null)
  const inputConfirmPasswordRef: RefObject<HTMLInputElement> = useRef(null)

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
          setTimeout(() => location.reload(), 1000)
        })
        .catch((error) => {
          setError(error.response.data.error)
        })
    }
    setEnviar(false)
  }, [enviar])

  const handleShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  return (
    <>
      <section
        className="register flex h-[600px] w-[30vw] items-center justify-center bg-neutral-100 tablet:w-[40vw] tabletMini:w-[45vw] phone:hidden"
        style={{
          borderRadius: '0px 8px 8px 0px',
        }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`${
            props.animation
              ? 'animation-desaparecer relative'
              : 'animation-aparecer'
          } flex flex-col`}
        >
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
            className="mb-2 rounded-md py-2 pl-3 "
            type="text"
            placeholder="Nome de usuário"
          />
          <label htmlFor="Email" className="font-medium">
            Email
          </label>
          <input
            ref={inputEmailRef}
            className="mb-2 rounded-md py-2 pl-3 "
            type="text"
            placeholder="Email"
          />
          <label htmlFor="Senha" className="font-medium">
            Senha
          </label>
          <div className="relative flex">
            <input
              ref={inputPasswordRef}
              className="mb-2 flex-1 rounded-md py-2 pl-3 "
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
            />
            <span
              onClick={handleShowPassword}
              className="absolute right-2 top-[43%] translate-y-[-50%] cursor-pointer"
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
            className="mb-2 rounded-md py-2 pl-3 "
            type="password"
            placeholder="Confirmar senha"
          />
          <p className="w-[300px] text-sm">
            Ao se registrar, você está aceitando nossos{' '}
            <a className="cursor-pointer text-green-200">termos de uso</a> e{' '}
            <a className="cursor-pointer text-green-200">
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
    </>
  )
}
