import React from 'react'
import Link from 'next/link'

interface IcommonButton {
  path : string,
  title : string
}

export const CommonButton = ({ path, title } : IcommonButton) => {
  return (
    <Link href={path}>
      <a className="mx-4 font-base px-3 py-1 rounded-xl hover:bg-[#B6BDF1] duration-200">
        {title}
      </a>
    </Link>
  )
}

