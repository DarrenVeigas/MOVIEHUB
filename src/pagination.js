import React, { useState } from 'react';
import './filter.css';

function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    
    setCurrentPage((page) => page + 1);
    console.log(pages);
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }
  

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      <div >
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          Prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : ""}`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          <b>Next</b>
        </button>
      </div>
    </>
  );
}

export default Pagination;