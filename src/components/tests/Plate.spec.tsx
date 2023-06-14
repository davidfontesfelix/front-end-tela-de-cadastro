import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Register from '../Register'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Login from '../Login'

const mock = new MockAdapter(axios)

jest.mock('next/router')

describe('Register component', () => {
  test('should render correctly', () => {
    render(<Register animation={undefined} />)

    expect(screen.getByPlaceholderText('Nome de usuário')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirmar senha')).toBeInTheDocument()
    expect(screen.getByText('Registre-se')).toBeInTheDocument()
  })

  test('registering', async () => {
    render(<Register animation={undefined} />)

    expect(
      screen.queryByText('conta criada com sucesso'),
    ).not.toBeInTheDocument()

    const inputName = screen.getByPlaceholderText(
      'Nome de usuário',
    ) as HTMLInputElement
    userEvent.type(inputName, 'david')

    const inputEmail = screen.getByPlaceholderText('Email') as HTMLInputElement
    userEvent.type(inputEmail, 'exemplo@example.com')

    const inputSenha = screen.getByPlaceholderText('Senha') as HTMLInputElement
    userEvent.type(inputSenha, 'senha123')

    const inputConfirmPassword = screen.getByPlaceholderText(
      'Confirmar senha',
    ) as HTMLInputElement
    userEvent.type(inputConfirmPassword, 'senha123')

    const submitButton = screen.getByText('Registre-se')

    userEvent.click(submitButton)

    await waitFor(() => {
      const user = {
        name: inputName.value,
        email: inputEmail.value,
        senha: inputSenha.value,
        confirmarSenha: inputConfirmPassword.value,
      }

      mock.onPost('http://localhost:3001/registrar').reply(201, user)

      expect(screen.queryByText('conta criada com sucesso')).toBeInTheDocument()
    })
  })
})
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Login component', () => {
  test('testing login', async () => {
    render(<Login animation={undefined} options={() => ({})} />)

    const InputUserName = screen.getByPlaceholderText('Nome de usuário')
    userEvent.type(InputUserName, 'david')
    const InputPassword = screen.getByPlaceholderText('Senha')
    userEvent.type(InputPassword, 'senha123')

    const buttonLogin = screen.getByText('Entrar')
    userEvent.click(buttonLogin)

    mock.onGet('http://localhost:3001/users?name=david&senha=senha123')
  })
})
