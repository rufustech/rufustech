import React from 'react'
import { rufustech1 } from '../assets'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      

<nav class="bg-[#0B123F] p-0 m-0 ">
    <div class="flex flex-wrap items-center justify-between  mx-auto max-w-screen-xl">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={rufustech1} class="h-20" alt="RufusTech Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <div class="flex items-center justify-items-end  space-x-6">
            <a href="tel:4037962192" class="text-lg  text-gray-500 dark:text-white hover:text-white hover:scale-125 hover:no-underline">(403) 796-2192</a>
            <Link
                            to="/login"
                            className=" text-xl px-5 text-white dark:text-white hover:text-white hover:scale-125 hover:no-underline"
                            >
                           Login
            </Link>
            
        </div>
    </div>
</nav>
<nav class="bg-gray-50 dark:bg-gray-50 shadow">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center justify-end">
            <ul class="flex flex-row text-[#0B123F] content-end font-medium mt-0 space-x-8 rtl:space-x-reverse text-xl">
                <li>
                    <a href="/" className="text-[#0B123F]  hover:no-underline" aria-current="page">Home</a>
                </li>
                {/* <li>
                    <a href="/about" class="text-[#0B123F]  hover:no-underline">About</a>
                </li> */}
                <li>
                            <Link
                                to="/blog"
                                className="text-[#0B123F]  hover:no-underline"
                            >
                                Blog
                            </Link>

                
                
                    {/* <a href="/blog" class="text-[#0B123F]  hover:no-underline">Tech Blog</a> */}
                </li>
                <li>
                    
                            <Link
                                to="/contact"
                                className="text-[#0B123F]  hover:no-underline"
                            >
                                Contact
                            </Link>
                
                    {/* <a href="/contact" class="text-[#0B123F] hover:no-underline">Contact</a> */}
                </li>
            </ul>
        </div>
    </div>
</nav>

    </div>
  )
}

export default Header
