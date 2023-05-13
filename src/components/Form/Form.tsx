'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  user: z.object({
    name: z.string().min(1, 'Por favor, informe um nome válido').max(255),
    lastName: z.string().min(1, 'Por favor, informe um sobrenome válido').max(255)
  })
})

export type FormDataProps = z.infer<typeof schema>

type FormProps = {
  onSubmitForm: (data: FormDataProps) => void
}

export function Form({
  onSubmitForm
}: FormProps) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormDataProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      user: {
        name: '',
        lastName: ''
      }
    }
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-4"
    >
      <input type="text" placeholder="Nome" aria-label="name" {...register("user.name")} />
      {errors.user?.name && <span>{errors.user.name.message}</span>}

      <input type="text" placeholder="Sobrenome" aria-label="lastName" {...register("user.lastName")} />
      {errors.user?.lastName && <span>{errors.user.lastName.message}</span>}

      <button type="submit">Enviar</button>
    </form>
  )
}
