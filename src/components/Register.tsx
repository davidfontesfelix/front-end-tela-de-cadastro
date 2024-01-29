import { useState } from 'react'
import * as Yup from 'yup'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface RegisterProps {
  animation: boolean
}

interface FormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const schema = Yup.object().shape({
  username: Yup.string().required('O nome de usuário é obrigatório'),
  email: Yup.string()
    .email('Digite um email valido')
    .required('O campo de email é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('O campo de senha é obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas devem ser iguais')
    .required('O campo de senha é obrigatório'),
})

export default function Register(props: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = {
      name: data.username,
      email: data.email,
      senha: data.password,
      confirmarSenha: data.confirmPassword,
    }
    async function sendData() {
      try {
        const response = await fetch(
          'https://servidor-da-tela-de-cadastro.vercel.app/registrar',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          },
        )
        if (response.ok) {
          setTimeout(() => location.reload(), 100)
        } else {
          console.log('solicitação deu erro')
        }
      } catch (error) {
        console.error(error)
      }
    }
    sendData()
  }
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.log(errors.username?.message)
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
        className="register flex h-[600px] w-[30vw] items-center justify-center bg-neutral-100 tablet:w-[40vw] tabletMini:w-[45vw] phone:hidden"
        style={{
          borderRadius: '0px 8px 8px 0px',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={`${
            props.animation
              ? 'animation-desaparecer relative'
              : 'animation-aparecer'
          } flex flex-col`}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl font-bold uppercase text-green-400">
              Crie sua Conta
            </h1>
            <p className="text-red-800"></p>
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
          <label htmlFor="Email" className="font-medium">
            Email
          </label>
          <input
            className="input mb-2 rounded-md py-2 pl-3 "
            type="text"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && (
            <p className="-mt-2 text-red-800">{errors.email.message}</p>
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
          <label htmlFor="Confirmar_senha" className="font-medium">
            Confirmar senha
          </label>
          <input
            className="input mb-2 rounded-md py-2 pl-3 "
            type="password"
            placeholder="Confirmar senha"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="-mt-2 text-red-800">
              {errors.confirmPassword.message}
            </p>
          )}
          <p className="w-[300px] text-sm">
            Ao se registrar, você está aceitando nossos{' '}
            <a className="cursor-pointer text-green-200">termos de uso</a> e{' '}
            <a className="cursor-pointer text-green-200">
              política de privacidade.
            </a>
          </p>
          <button
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
