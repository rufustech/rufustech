import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (

        
        <nav>
  <ul class="inline-flex -space-x-px text-base h-10">
    <li>
      <a onClick={goToPrevPage} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>

    {pageNumbers.map(pgNumber => (
    <li>
      <a href="#" className= {`flex items-center justify-center px-4 h-10
       leading-tight text-gray-500 bg-white border border-gray-300
        hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
         dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
          dark:hover:text-white page-item ${currentPage == pgNumber ? 'active' : ''} `} >

<a onClick={() => setCurrentPage(pgNumber)}  
    className='page-link' 
    href='#'>
    
    {pgNumber}
</a>
</a>
</li>
))}
    <li>
        

      <a onClick={goToNextPage} href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>

    </li>
   
  </ul>
</nav>
        
    )
}

export default Pagination