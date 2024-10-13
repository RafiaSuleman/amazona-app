import { Metadata } from 'next'
import Form from './form'
export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function Signin() {
  return <Form />
}