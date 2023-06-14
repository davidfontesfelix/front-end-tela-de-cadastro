import Link from 'next/link'
import { RefObject, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface LoginProps {
  animation: any
  options: () => {}
}

export default function Login(props: LoginProps) {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const inputNameRef: RefObject<HTMLInputElement> = useRef(null)
  const inputPasswordRef: RefObject<HTMLInputElement> = useRef(null)

  const fetchData = () => {
    axios
      .get(
        // eslint-disable-next-line prettier/prettier
        `https://servidor-da-tela-de-cadastro.vercel.app/users?name=${inputNameRef.current!.value
        }&senha=${inputPasswordRef.current!.value}`,
      )
      .then((response) => {
        router.push(`/usuario/${response.data.id}`)
      })
      .catch((error) => {
        setError(error.response.data.error)
      })
  }

  const checkCredentials = () => {
    setError('')
    fetchData()
  }

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
        className="login flex h-[600px] w-[30vw] items-center justify-center bg-neutral-100 tablet:w-[40vw] tabletMini:w-[45vw] phone:w-[89vw] phone:rounded-lg"
        style={{
          borderRadius: '8px 8px 8px 8px',
        }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          // eslint-disable-next-line prettier/prettier
          className={`${props.animation ? 'animation-desaparecer' : 'animation-aparecer'
            // eslint-disable-next-line prettier/prettier
            }  flex flex-col`}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2 text-center text-2xl font-bold uppercase text-green-400">
              Entre para explorar
            </h1>
            <p className="mb-3 text-red-800">{error}</p>
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
          <div className="mt-2 flex gap-16">
            <div className="flex items-center gap-1">
              <input type="checkbox" className="" />
              <label className="text-sm" htmlFor="Lembrar de mim">
                Lembre de mim
              </label>
            </div>
            <div>
              <Link href="/forgot password" className="text-sm text-green-200">
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          <button
            onClick={() => checkCredentials()}
            className="buttons mt-4 rounded-md bg-green-300 py-2 font-bold text-gray-100 transition-colors hover:bg-green-400"
          >
            Entrar
          </button>
          <div>
            <p className="mt-2 text-sm">
              Não tem uma conta?{' '}
              <Link
                href={'/register'}
                className="hidden text-green-200 phone:block"
              >
                increver-se
              </Link>
              <span
                onClick={() => props.options()}
                className="cursor-pointer text-green-200 phone:hidden"
              >
                increver-se
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  )
}
