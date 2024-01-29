import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface LoginProps {
  animation: boolean | undefined
  options: () => void
}

interface FormValues {
  username: string
  password: string
}

const schema = Yup.object().shape({
  username: Yup.string().required('O campo de nome de usuário é necessário'),
  password: Yup.string().required('O campo de senha é necessário'),
})

export default function Login(props: LoginProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .get(
        `https://servidor-da-tela-de-cadastro.vercel.app/users?name=${data.username}&senha=${data.password}`,
      )
      .then((response) => {
        router.push(`/usuario/${response.data.id}`)
      })
      .catch((error) => {
        console.error(error.response.data.error)
      })
  }

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.error(errors)
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
          onSubmit={handleSubmit(onSubmit, onError)}
          className={`${
            props.animation ? 'animation-desaparecer' : 'animation-aparecer'
          }  flex flex-col`}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2 text-center text-2xl font-bold uppercase text-green-400">
              Entre para explorar
            </h1>
          </div>
          <label htmlFor="Nome_de_usuario" className="font-medium">
            Nome de usuário
          </label>
          <input
            className="input mb-2 rounded-md py-2 pl-3 "
            type="text"
            placeholder="Nome de usuário"
            {...register('username')}
          />
          {errors.username && (
            <p className="-mt-2 text-red-800">{errors.username.message}</p>
          )}
          <label htmlFor="Senha" className="font-medium">
            Senha
          </label>
          <div className="relative flex flex-col">
            <input
              className="input mb-2 flex-1 rounded-md py-2 pl-3 "
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              {...register('password')}
            />
            {errors.password && (
              <p className="-mt-2 text-red-800">{errors.password.message}</p>
            )}
            <span
              onClick={handleShowPassword}
              className="absolute right-2 top-2 cursor-pointer"
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
          <button className="buttons mt-4 rounded-md bg-green-300 py-2 font-bold text-gray-100 transition-colors hover:bg-green-400">
            Entrar
          </button>
          <div>
            <p className="mt-2 text-sm">
              Não tem uma conta?{' '}
              <Link
                href={'/register'}
                className="hidden text-green-200 phone:block"
              >
                inscrever-se
              </Link>
              <span
                onClick={() => props.options()}
                className="cursor-pointer text-green-200 phone:hidden"
              >
                inscrever-se
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  )
}
