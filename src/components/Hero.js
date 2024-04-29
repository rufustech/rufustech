import React from 'react'

const herobg = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61c16760d0e2e0.83587156.mp4"
const herobg1 = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61c160ada50751.57145732.mp4?filename=1118736_4k_search_numbers_3840x2160.mp4"
const herobg2 = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61b593756995c2.98061119.mp4?filename=1118553_4k_form_graphic_3840x2160.mp4"
const herobg3 = "https://videocdn.cdnpk.net/joy/content/video/free/video0485/large_preview/_import_61c161cd36c186.48047560.mp4?filename=1118738_4k_networking_stream_3840x2160.mp4"

function Hero() {
  return (
    <div class="container shadow pt-4 pb-2 my-3 mx-auto px-4">
  
  <section class="mb-32">
    <div style={{width: "100%", height: "34rem"}} class="relative overflow-hidden">
    <video className="w-full rounded-md" autoPlay loop muted>
              <source className='' src={herobg2} type="video/mp4" />
            
            </video>
    </div>
    <div class="container mx-auto px-6 md:px-12 xl:px-32">
      <div class="text-center">
        <div
          class="mt-[-170px] block rounded-lg bg-[hsla(0,0%,100%,0.55)] bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:py-16 md:px-12">
          <h1 class="mb-16 text-blue-500 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
            The best offer on the market <br /><span class="text-danger dark:text-danger-400">for your business</span>
          </h1>
          <a class="mb-2 inline-block rounded bg-danger px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] md:mr-2 md:mb-0"
            data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Get started</a>
          <a class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:text-danger-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-40"
            data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Learn more</a>
        </div>
      </div>
    </div>
  </section>

    <div>
      <div className="lg:h-60">
        {/* <video className=" w-full shadow-xl w-full" autoPlay loop muted>
          <source  className="mainvid rounded-md shadow-xl dark:shadow-black/20" alt="image" src={herobg5} type="video/mp4" />
        </video> */}
        {/* <div class="md:mb-12 shadow-lg shadow-blue-200 opacity-90">
            <img className='' src={rufus}
              class="lg:rotate-[4deg] w-full rounded-md shadow-xl dark:shadow-black/20" alt="image" />
          </div> */}
      </div>
      <div className="my-4 mx-auto md:px-4">
        <section className="text-center">
          <div className="px-6 py-2 md:px-4">
            <div className="mx-auto xl:px-32">
              <div className="flex grid items-center lg:grid-cols-1">
                {/* Conditionally render the div based on screen size */}
                <div className="hidden md:block mb-12 md:mt-8 lg:mt-0 lg:mb-0">
                  <div style={{ backgroundColor: 'rgba(11, 18, 63, 0.3)' }} className="relative block rounded-lg px-12 py-20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.7),0_10px_20px_-2px_rgba(0,0,0,0.5)] backdrop-blur-[0px] shadow-black/40 md:px-12 lg:-mr-14">
                    <h4 className="mt-2 mb-8 text-2xl font-bold tracking-tight md:text-3xl xl:text-3xl text-white">
                      <span className='text-blue-500 animate-bounce'>Hello, My name is</span> <br /> Rufaro Mucheri <br /><span className="text-primary text-blue-500">I am a Web Developer</span>
                    </h4>
                   <a href='/contact'> <button type="button" className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
                      Start
                    </button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>



</div>
  )
}

export default Hero
