import { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register() {
  return <Form />
}