import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function EmailAccount() {
  const router = useRouter()
  const email = router.query.email

  const [viewError, setViewError] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (email) {
      axios
        .get(
          `https://servidor-da-tela-de-cadastro.vercel.app/users/search/${email}`,
        )
        .then((response) => {
          setUserName(response.data)
        })
        .catch(() => {
          setViewError(true)
        })
    }
  }, [email])

  return (
    <div>
      <section className="background flex h-screen w-screen items-center justify-center">
        <div className="vidro absolute h-screen w-screen"></div>
        <div className="z-10 h-[600px] w-[60vw] rounded-md bg-white tabletMini:w-[80vw] phone:w-[89vw]">
          {viewError ? (
            <div className="flex h-[600px] w-[60vw] flex-col items-center justify-center rounded-lg bg-neutral-100  tabletMini:w-[80vw] phone:w-[89vw]">
              <h1 className="text-9xl text-green-200">404</h1>
              <h2 className="text-2xl text-green-400">Conta não encontrada.</h2>
            </div>
          ) : (
            <section className="register flex h-[600px] w-[60vw] flex-col items-center justify-center rounded-lg bg-neutral-100  tabletMini:w-[80vw] phone:w-[89vw]">
              <h1 className="mb-2 text-2xl font-bold uppercase text-green-400">
                Redefina sua senha
              </h1>
              <h2 className="mx-24 text-center text-lg text-green-300">
                enviaremos um link para{' '}
                <span className="font-bold">{userName}</span>
              </h2>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}
