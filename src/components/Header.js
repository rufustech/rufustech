import React from 'react'
import { rufustech1 } from '../assets'

function Header() {
  return (
    <div>
      

<nav class="bg-[#0B123F] p-0 m-0 ">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={rufustech1} class="h-20" alt="RufusTech Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <div class="flex items-center  space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">(403) 796-2192</a>
            <a href="#" class="text-lg  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
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
                    <a href="/blog" class="text-[#0B123F]  hover:no-underline">Tech Blog</a>
                </li>
                <li>
                    <a href="/contact" class="text-[#0B123F] hover:no-underline">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

    </div>
  )
}

export default Header
