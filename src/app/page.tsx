'use client'

import { Form, FormDataProps } from '@/components/Form'

export default function Home() {
  function handleSubmitForm(data: FormDataProps) {
    console.log('Form Submit', data)
  }


  return (
    <main className="flex min-h-screen flex-col">
      <h2>Form TDD</h2>
      <Form onSubmitForm={handleSubmitForm} />
    </main>
  )
}
