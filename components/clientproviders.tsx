'use client'

import toast, { Toaster } from "react-hot-toast"
import { SWRConfig } from "swr"
import { cartStore } from "../lib/hooks/usercartstore"
import { useEffect } from "react"

// Rename the component to start with an uppercase letter
export default function ClientProviders({
  children
}: {
  children: React.ReactNode
}) {

  const updateStore = () => {
    // jitny marzi tabs ma khool lo cart ki items show ho gi chahy alg alg tab ma product cart ma add hoi ho 
    cartStore.persist.rehydrate()
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', updateStore)
    window.addEventListener('focus', updateStore)
    return () => {
      document.removeEventListener('visibilitychange', updateStore)
      window.removeEventListener('focus', updateStore)
    }
  }, [])

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          toast.error(error.message)
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init)
          if (!res.ok) {
            throw new Error('An error occurred while fetching the data.')
          }
          return res.json()
        },
      }}
    >
      <Toaster />
      {children}
    </SWRConfig>
  )
}
