import React from "react";

function Pagi({ paginate, postsper, totalpost, current }) {

  const handlePrevious = () => {
    if (current > 1) {
      paginate(current - 1);
    }
  };

  const handleNext = () => {
    if (current < Math.ceil(totalpost / postsper)) {
      paginate(current + 1);
    }
  };

  return (
    <div className="container text-center mb-4 p-3">
      <button
        onClick={handlePrevious}
        className={`bg-primary text-white p-1 rounded-1 mx-2 border-0 px-3 ${current === 1 ? 'disabled' : ''}`}
        disabled={current === 1}
      >
        Previous
      </button>
      <button className="bg-primary text-white p-1 rounded-1 mx-2 px-3 border-0">{current}</button>
      <button
        onClick={handleNext}
        className={`bg-primary text-white p-1 rounded-1 mx-2 border-0 px-3 ${current === Math.ceil(totalpost / postsper) ? 'disabled' : ''}`}
        disabled={current === Math.ceil(totalpost / postsper)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagi;
