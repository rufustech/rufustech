import React from 'react'
import { cloud, cooloffice, darkoffice, devops, laptopdev } from '../assets'

function Services() {
  return (
    <section class="text-gray-600 body-font mb-8">
  <div class="container px-4 py- mx-auto">
    <div class="flex flex-wrap w-full mb-20">
      <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">What I Do</h1>
        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
      <p class="lg:w-1/2 w-full leading-relaxed text-white text-4x1">My Services</p>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-6 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6" src={darkoffice} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">Web Design</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Web Development</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-6 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6" src={devops} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">DevOps</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">DevOps Engineering</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-6 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6" src={cloud} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">Hosting Services</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Cloud Services</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-6 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6" src={laptopdev} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">Consultancy</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Tech Consultancy Services</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Services
