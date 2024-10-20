import { cache } from "react";
import dbConnect from "../dbconnect";
import ProductModel, { Product } from "../model/productmodel";

export const revalidate = 3600

const getLatest = cache(async () => {
    await dbConnect()
    // .lean to convert result into plane java script
    const products = await ProductModel.find({}).sort({ _id: -1 }).limit(6).lean() 
    return products as Product[]
  })

  const getFeatured = cache(async () => {
    await dbConnect()
    const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
    return products as Product[]
  })

  const getBySlug = cache(async (slug: string) => {
    await dbConnect()
    const product = await ProductModel.findOne({ slug }).lean()
    return product as Product
  })
  
  const productService = {
    getLatest,
    getFeatured,
    getBySlug,
   /*  getByQuery,
    getCategories, */
  }
  export default productService