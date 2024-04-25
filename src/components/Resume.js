import React from 'react';

function Resume() {
  return (
    <div className='container px-5 py-20 mx-auto'>
       <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Portfolio</h1>
      <p style={{fontSize: "32px"}} class=" w-full leading-relaxed text-gray-500">My recent Projects</p>
    </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-2">
        <div className="resumecard">
          <iframe src="https://www.magetsi.co.zw" title="Magetsi Website" style={{ width: "97.5%", height: "97.8%", borderRadius: "5px" }}></iframe>
          <h2></h2>
        </div>
        <div className="resumecard">
        <iframe src="https://www.wildroseplacement.com" title="Wildrose Website" style={{ width: "97.5%", height: "97.8%", borderRadius: "5px" }}></iframe>
          </div>
       
        <div className="resumecard"><iframe src="https://www.solvaxion.com" title="Solvaxion Website" style={{ width: "97.5%", height: "97.8%", borderRadius: "5px" }}></iframe></div>
        <div className="resumecard"><iframe src="https://main.d1zznrc3rjdw3p.amplifyapp.com/" title="Wildrose Website" style={{ width: "97.5%", height: "97.8%", borderRadius: "5px" }}></iframe></div>
      </div>
    </div>
  );
}

export default Resume;
