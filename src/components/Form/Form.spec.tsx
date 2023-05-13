import { render, screen, logRoles, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { Form } from "@/components/Form"

describe('<Form />', () => {
  const handleSubmitForm = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be able to render the form correctly', () => {
    render(<Form onSubmitForm={handleSubmitForm} />)

    const inputName = screen.getByRole('textbox', { name: /^name/i })
    const inputLastName = screen.getByRole('textbox', { name: /lastname/i })
    const buttonSubmit = screen.getByRole('button', { name: /enviar/i })

    expect(inputName).toBeVisible()
    expect(inputLastName).toBeVisible()
    expect(buttonSubmit).toBeVisible()
  })

  it('should show error message when fields was empty', async () => {
    render(<Form onSubmitForm={handleSubmitForm} />)

    const buttonSubmit = screen.getByRole('button', { name: /enviar/i })
    await userEvent.click(buttonSubmit)

    expect(await screen.findByText(/por favor, informe um nome válido/i)).toBeVisible()
    expect(await screen.findByText(/por favor, informe um sobrenome válido/i)).toBeVisible()
  })

  it('should type into name and lastName fields and submit', async () => {
    render(<Form onSubmitForm={handleSubmitForm} />)

    const mockName = 'John'
    const mockLastName = 'Doe'

    const inputName = screen.getByRole('textbox', { name: /^name/i })
    const inputLastName = screen.getByRole('textbox', { name: /lastname/i })
    const buttonSubmit = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, mockName)
    await userEvent.type(inputLastName, mockLastName)
    await userEvent.click(buttonSubmit)

    await waitFor(() => {
      const errorNameElement = screen.queryByText("Por favor, informe um nome válido")
      const errorLastNameElement = screen.queryByText("Por favor, informe um sobrenome válido")
      expect(errorNameElement).not.toBeInTheDocument()
      expect(errorLastNameElement).not.toBeInTheDocument()
    })
  })

  it('should type into name and lastName fields has values in the inputs', async () => {
    render(<Form onSubmitForm={handleSubmitForm} />)

    const mockName = 'John'
    const mockLastName = 'Doe'

    const inputName = screen.getByRole('textbox', { name: /^name/i })
    const inputLastName = screen.getByRole('textbox', { name: /lastname/i })
    const buttonSubmit = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, mockName)
    await userEvent.type(inputLastName, mockLastName)
    await userEvent.click(buttonSubmit)

    expect(inputName).toHaveValue(mockName)
    expect(inputLastName).toHaveValue(mockLastName)
  })

  it('should handleSubmitForm has called', async () => {
    const mockName = 'John'
    const mockLastName = 'Doe'

    render(<Form onSubmitForm={handleSubmitForm} />)
    const inputName = screen.getByRole('textbox', { name: /^name/i })
    const inputLastName = screen.getByRole('textbox', { name: /lastname/i })
    const buttonSubmit = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, mockName)
    await userEvent.type(inputLastName, mockLastName)
    await userEvent.click(buttonSubmit)

    await waitFor(() => {
      expect(handleSubmitForm).toHaveBeenCalledTimes(1)
      expect(handleSubmitForm).toHaveBeenCalledWith({
        user: {
          name: mockName,
          lastName: mockLastName
        }
      }, expect.anything())
    })
  })
})