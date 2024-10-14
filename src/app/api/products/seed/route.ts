/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from 'next/server'
import data from '../../../../../lib/data'
import dbConnect from '../../../../../lib/dbconnect'
import UserModel from '../../../../../lib/model/usermodel'
import ProductModel from '../../../../../lib/model/productmodel'

export const GET = async (request: NextRequest) => {
    const { users, products } = data
    await dbConnect()
    await UserModel.deleteMany()
    await UserModel.insertMany(users)
  
    await ProductModel.deleteMany()
    await ProductModel.insertMany(products)
  
    return NextResponse.json({
      message: 'seeded successfully',
      users,
      products,
    })
  }