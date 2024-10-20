/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "../../../../../lib/auth"
import dbConnect from "../../../../../lib/dbconnect"
import OrderModel from "../../../../../lib/model/ordermodel"

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth
  await dbConnect()
  const orders = await OrderModel.find({ user: user._id })
  return Response.json(orders)
}) as any