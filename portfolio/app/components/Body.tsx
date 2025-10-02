import React from 'react'

type Props = {
    children: React.ReactNode;
}

function Body({children}: Props) {
  return (
    <div className="m-4 border-gray border text-primary rounded-lg min-h-[calc(100vh-2rem)] bg-[#0F172B]">{children}</div>
  )
}

export default Body