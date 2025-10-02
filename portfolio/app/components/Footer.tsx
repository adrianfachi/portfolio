import React from 'react'
import Link from 'next/link';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div>
        <div className="flex justify-baseline border-t border-t-gray items-center media sm:justify-between">
            <div className='flex items-center'>
                <p className='text-primary text-xs px-6 h-8 items-center gap-16 flex media2 border-r border-r-gray'>minhas redes:</p>
                <Link href={"https://www.instagram.com/adrianfachi_/"} target='_blank' className='px-4 border-r border-r-gray  h-8 flex items-center text-primary hover:text-purple transition'>{<FaInstagram/>}</Link>
                <Link href={"https://www.linkedin.com/in/adrian-fachi-35601a279/"} target='_blank' className='px-4 border-r border-r-gray  h-8 flex items-center text-primary hover:text-purple transition'>{<FaLinkedin/>}</Link>
            </div>
            <div className='flex'>
                <Link href={"ttps://github.com/adrianfachi"} target='_blank' className='px-4 h-8 flex items-center text-primary hover:text-purple transition'><p className='text-primary text-xs px-6 h-8 items-center gap-16 sm:flex hidden border-l border-l-gray'>@adrianfachi</p>{<FaGithub/>}</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer