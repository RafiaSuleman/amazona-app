'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useCartService from '../../lib/hooks/usercartstore'

const Menu = () => {
  const { items } = useCartService()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' }) // Corrected 'callbackurl' to 'callbackUrl'
  }
  const { data: session } = useSession()

  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  return (
    <div>
      <ul className='flex items-stretch gap-10'>
        <li>
          <Link className='btn btn-ghost rounded-btn flex items-center gap-2' href='/cart'>
            Cart
            {mounted && items.length !== 0 && (
              <span className='border border-red-600 bg-red-800 px-2 py-1 rounded'>
                {items.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
        </li>
        {session && session.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost rounded-btn">
                    {session.user.name}
                    {/*  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 50 30"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-2 h-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>  */}
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-4 shadow bg-base-300 rounded-box w-52 "
                  >
                   {/*  {session.user.isAdmin && (
                      <li onClick={handleClick}>
                        <Link href="/admin/dashboard">Admin Dashboard</Link>
                      </li>
                    )} */}

                  {/*   <li onClick={handleClick}>
                      <Link href="/order-history">Order history </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li> */}
                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button
                className="btn btn-ghost rounded-btn"
                type="button"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </li>
          )}
      </ul>
    </div>
  )
}

export default Menu
