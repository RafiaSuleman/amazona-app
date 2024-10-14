'use client'

import { Toaster } from "react-hot-toast"

export default function clientProviders({
    children
}:{
    children : React.ReactNode
}){
    return(
        <>
        <Toaster/>
        {children}
        </>
    )
}