import Link from "next/link";
import Image from "next/image";
import AddToCart from "../../../../../components/products/addtocart";
import productService from "../../../../../lib/services/productservice";
import { convertDocToObj } from "../../../../../lib/utils";

// product name in the tab
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}


export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>product not found</div>;
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-3 grid-cols-1">
      <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        ></Image>
        <div className="lg:mt-0 mt-5 px-5">
        <ul className="space-y-4">
          <li>
            <h1 className="text-xl">{product.name}</h1>
          </li>
          <li>
            {product.rating} of {product.numReviews} reviews
          </li>
          <li>{product.brand}</li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            Description: <p>{product.description} </p>
          </li>
        </ul>
        <div className="card bg-base-300 shadow-xl mt-5">
        <div className="card-body">
          <div className="mb-2 flex justify-between">
            <div>price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
          </div>
        </div>
        {product.countInStock !== 0 && (
          <div className="card-actions justify-center">
            <AddToCart item={{...convertDocToObj( product) , qty:0 , color: '' ,size: ''}  }/>
          </div>)}
          
      </div>
      </div>
      
        </div>
    </>
  );
}
