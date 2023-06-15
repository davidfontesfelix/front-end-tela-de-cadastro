import axios from 'axios'
import { useRouter } from 'next/router'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Roboto_Slab } from 'next/font/google'

const RobotoSlab = Roboto_Slab({
  subsets: ['latin'],
})

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [enviar, setEnviar] = useState<false | true>(false)
  const router = useRouter()

  const inputEmailRef: RefObject<HTMLInputElement> = useRef(null)

  useEffect(() => {
    setError('')
    if (enviar === true) {
      axios
        .get(
          `https://servidor-da-tela-de-cadastro.vercel.app/users/search/${
            inputEmailRef.current!.value
          }`,
        )
        .then(() => {
          router.push(`/forgot%20password/${inputEmailRef.current!.value}`)
        })
        .catch(() => {
          setError('Desculpe, mas não foi possível encontrar a sua conta.')
        })
    }
    setEnviar(false)
  }, [enviar, router])

  return (
    <section
      className={`${RobotoSlab.className} background flex h-screen w-screen items-center justify-center`}
    >
      <div className="vidro absolute h-screen w-screen"></div>
      <div className="z-10 h-[600px] w-[60vw] rounded-md bg-white tabletMini:w-[80vw] phone:w-[89vw]">
        <section className="register flex h-[600px] w-[60vw] items-center justify-center rounded-lg bg-neutral-100  tabletMini:w-[80vw] phone:w-[89vw]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="mb-2 text-2xl font-bold uppercase text-green-400">
              Encontre Sua Conta
            </h1>
            <p className="font-bold text-red-600">{error}</p>
            <h2 className="mb-6">Digite seu e-mail para procurar sua conta.</h2>
            <input
              ref={inputEmailRef}
              className="input mb-2 w-[330px] rounded-md py-2 pl-3"
              type="email"
              placeholder="Email"
            />
            <button
              onClick={(e) => setEnviar(true)}
              className="buttons mt-4 flex w-40 justify-center rounded-md bg-green-300 py-2 font-bold text-gray-100 transition-colors hover:bg-green-400"
            >
              Procurar
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}
