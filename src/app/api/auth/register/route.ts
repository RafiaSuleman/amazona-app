import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../../../lib/dbconnect'
import UserModel from '../../../../../lib/model/usermodel'

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json()
  await dbConnect()

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    return Response.json(
      { message: 'User has been created' },
      {
        status: 201,
      }
    )
  } catch (err) {
    // Check if 'err' is an instance of Error before accessing 'message'
    if (err instanceof Error) {
      return Response.json(
        { message: err.message },
        {
          status: 500,
        }
      )
    }
    // Fallback in case 'err' is not of type Error
    return Response.json(
      { message: 'An unknown error occurred' },
      {
        status: 500,
      }
    )
  }
}
