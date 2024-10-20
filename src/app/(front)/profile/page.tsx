import { Metadata } from 'next'
import Form from './form'


export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Profile() {
  return <Form/>
}