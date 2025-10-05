import React from 'react'
import Link from 'next/link'

function Apresentacion() {
  return (
    <div className='flex flex-col gap-8 p-4'>
      <div className=''>
        <p className='text-xs'>Olá, eu sou o</p>
        <h1 className='text-white text-3xl md:text-4xl'>Adrian Fachi</h1>
        <h2 className='text-purple text-base md:text-xl'>&gt; Front-end developer</h2>
      </div>
      <div className='text-xs'>
        <p className='hidden md:flex'>// para continuar complete o jogo</p>
        <p>// meu perfil no github:</p>
        <p><span className='text-purple'>const </span> <span className='text-green'>gitHubLink </span>= <Link href={"https://github.com/adrianfachi"} target='_blank' className='text-red break-all'>https://github.com/adrianfachi</Link></p>
      </div>
    </div>
  )
}

export default Apresentacion