import React from 'react'
import { rufus } from '../assets'

const herobg = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61c16760d0e2e0.83587156.mp4"
const herobg1 = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61c160ada50751.57145732.mp4?filename=1118736_4k_search_numbers_3840x2160.mp4"
const herobg2 = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61b593756995c2.98061119.mp4?filename=1118553_4k_form_graphic_3840x2160.mp4"
const herobg3 = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61c161cd36c186.48047560.mp4?filename=1118738_4k_networking_stream_3840x2160.mp4"
const herobg4 = "https://cdn.pixabay.com/video/2020/08/21/47802-451812879_large.mp4"
const herobg5=  "https://cdn.pixabay.com/video/2020/09/26/50944-462202546_large.mp4"

function Heros() {
  return (
    <div>
            <div  class="h-28 ">
          <video  className="lg:rotate-[deg] w-full  shadow-xl w-full " autoPlay loop muted>
    <source className="mainvid w-full rounded-md shadow-xl dark:shadow-black/20" alt="image" src={herobg5} type="video/mp4" />
</video>
{/* <div class="md:mb-12 shadow-lg shadow-blue-200 opacity-90">
            <img className='' src={rufus}
              class="lg:rotate-[4deg] w-full rounded-md shadow-xl dark:shadow-black/20" alt="image" />
          </div> */}
              
          </div>
    <div class=" my-4 mx-auto md:px-4">
 
  <section class=" text-center">
    <div class=" px-6 py-2 md:px-4">
      <div class=" mx-auto xl:px-32">
        <div class="flex grid items-center lg:grid-cols-1">
          <div class="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
          <div style={{ backgroundColor: 'rgba(11, 18, 63, 0.3)' }} class="relative z-[1] block rounded-lg  px-12 py-20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.7),0_10px_20px_-2px_rgba(0,0,0,0.5)] backdrop-blur-[0px] shadow-black/40 md:px-12 lg:-mr-14">
    <h4 class="mt-2 mb-8 text-2xl font-bold tracking-tight md:text-3xl xl:text-3xl text-white">
        <span className='text-blue-500 animate-bounce'>Hello, My name is</span> <br/> Rufaro Mucheri <br /><span class="text-primary text-blue-500">I am a Web Developer</span>
    </h4>
    <button type="button"
        class="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init data-te-ripple-color="light">
        Start
    </button>
</div>

          </div>
    
        </div>
      </div>
    </div>
  </section>
  
</div>
</div>
  )
}

export default Heros
