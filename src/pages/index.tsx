import Login from '@/components/Login'
import Plate from '@/components/Plate'
import Register from '@/components/Register'
import { useState } from 'react'
import { Roboto_Slab } from 'next/font/google'

const RobotoSlab = Roboto_Slab({
  subsets: ['latin'],
})

export default function Home() {
  const [loginOrRegister, setLoginOrRegister] = useState('login')
  const [loginOrRegisterButton, setLoginOrRegisterButton] =
    useState('Registra-se')
  const [animationSignIn, setAnimationSignIn] = useState<true | false>()
  const [animationSignUp, setAnimationSignUp] = useState(true)

  const exchangeOptions = () => {
    if (loginOrRegister === 'login') {
      setLoginOrRegister('register')
      setAnimationSignIn(true)
      setAnimationSignUp(false)
      setLoginOrRegisterButton('Entrar')
    } else {
      setLoginOrRegister('login')
      setAnimationSignIn(false)
      setAnimationSignUp(true)
      setLoginOrRegisterButton('Registre-se')
    }
  }

  return (
    <main
      className={`${RobotoSlab.className} flex h-screen w-screen items-center justify-center`}
    >
      {/* vidro */}
      <div className="vidro absolute h-screen w-screen"></div>
      <div className="z-10 h-[600px] w-[60vw] rounded-md bg-neutral-100 tablet:w-[75vw] tabletMini:w-[80vw] phone:w-[89vw]">
        <Plate
          LoginOrRegister={loginOrRegister}
          ChangeButton={loginOrRegisterButton}
          options={async () => exchangeOptions()}
        />
        <div className="container flex w-full">
          <Login
            animation={animationSignIn}
            options={async () => exchangeOptions()}
          />
          <Register animation={animationSignUp} />
        </div>
      </div>
    </main>
  )
}
