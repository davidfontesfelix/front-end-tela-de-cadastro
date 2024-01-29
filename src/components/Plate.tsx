export interface PlateProps {
  ChangeButton: any
  options: () => void
  LoginOrRegister: any
}

export default function Plate(props: PlateProps) {
  const setMove = () => {
    if (props.LoginOrRegister === 'login') {
      return '100.2%'
    } else {
      return '0%'
    }
  }
  const setBorderRadius = () => {
    if (props.LoginOrRegister === 'login') {
      return '0px 8px 8px 0px'
    } else {
      return '8px 0px 0px 8px'
    }
  }

  return (
    <article
      className="transition-plate absolute z-50 flex translate-x-[0%] phone:hidden"
      style={{
        transform: `translateX(${setMove()})`,
      }}
    >
      <div
        className="flex h-[600px] w-[30vw] flex-col items-center justify-center bg-green-100 tablet:w-[38vw] tabletMini:w-[40vw]"
        style={{ borderRadius: setBorderRadius() }}
      >
        <div className="sombra absolute h-full w-full"></div>
        <div className="z-20 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2 text-4xl tablet:text-[28px] tabletMini:text-2xl">
              Bem-Vindo Aventureiro
            </h1>
            <h2 className="mx-10 text-center">
              Bem-vindo para explorar uma vasta natureza conosco.
            </h2>
          </div>
          <button
            className="buttons mt-4 rounded-md border-2 border-green-300 bg-green-300/30 px-10 py-2 text-lg text-green-400"
            onClick={() => props.options()}
          >
            {props.ChangeButton}
          </button>
        </div>
        <h4 className="absolute bottom-4 text-sm ">©2023 David Fontes</h4>
      </div>
    </article>
  )
}
