import React, { useState, useEffect } from 'react';
import { background, rufus } from '../assets';

function Heros() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set fade in to true after component mounts
    setFadeIn(true);
  }, []);

  return (
    <div>
      <div className="lg relative">
        <img
          style={{ height: "600px", objectFit: "cover", objectPosition: "center" }}
          className="w-full  shadow-xl dark:shadow-black/20"
          src={background}
          alt="image"
        />
        <div className={`absolute inset-0 flex justify-center items-center text-center ${fadeIn ? 'fade-in' : ''}`}>
          <div
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            className="relative block rounded-lg px-12 py-20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.7),0_10px_20px_-2px_rgba(0,0,0,0.5)] backdrop-blur-[0px] shadow-black/40 md:px-12 lg:-mr-14 transition-opacity duration-1000"
          >
            <h4 className="mt-2 mb-8 text-2xl font-bold tracking-tight md:text-3xl xl:text-3xl text-white">
              <span className='text-white text-bold w-6 h-6'>Let's craft a digital masterpiece that resonates with your audience and drives results</span> <br /> <br /><span className="text-primary text-white"></span>
            </h4>
            <a href='/contact'>
              <button
                type="button"
                className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Start
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="my-4 mx-auto md:px-4">
        <section className="text-center">
          <div className="px-6 py-2 md:px-4">
            <div className="mx-auto xl:px-32">
              <div className="flex grid items-center lg:grid-cols-1">
                <div className="hidden md:block mb-12 md:mt-8 lg:mt-0 lg:mb-0">
                  {/* Content */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Heros;
