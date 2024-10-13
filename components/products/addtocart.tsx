'use client'

// import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { OrderItem } from '../../lib/model/ordermodel'
import useCartService from '../../lib/hooks/usercartstore'

export default function AddToCart({ item }: { item: OrderItem }) {
  // const router = useRouter()
  const { items, increase, decrease } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => { 
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])  

  const addToCartHandler = () => {
    increase(item)
  }
  return existItem ? (
    // if already exist
    <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
      -
      </button>
      <span className="">{"  "}{existItem.qty} {"  "}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    // if not exist in cart
    <button
      className="btn bg-[#4813BA] w-full"
      type="button"
      onClick={addToCartHandler}
    >
      Add to cart
    </button>
  )
}