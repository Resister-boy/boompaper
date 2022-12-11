import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const Brand:NextPage = () => {
  return (
    <Link href='/'>
      <a className="text-2xl text-violet-500 font-bold">
        <Image 
          src="/designAssets/boompaper-logo.svg"
          alt="Boom Paper"
          width={197}
          height={48}
          />
      </a>
    </Link>
  )
}