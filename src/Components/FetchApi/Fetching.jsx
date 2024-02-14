import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayData from "./DisplayData";
import Pages from "../Pagination/Pages";
import Header from "../Header";

function Fetching() {
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(30);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://openlibrary.org/search.json?q=${searchVal}&fields=key,title,author_name,first_publish_year&page=${currentPage}&limit=${cardsPerPage}`
      )
      .then((res) => {
        setInfos(res.data.docs);
        // setFilteredInfos(res.data.docs);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchVal]);

  const handlePrevious=()=>{
    setCurrentPage(currentPage-1)
  }

  const handleNext=()=>{
    setCurrentPage(currentPage+1)
  }

  const handleSearch = () => {
   
      axios
        .get(
          `https://openlibrary.org/search.json?q=${searchVal}&fields=key,title,author_name,first_publish_year&page=1&limit=${cardsPerPage}`
        )
        .then((res) => {
          setInfos(res.data.docs);
          // setFilteredInfos(res.data.docs);
        })
        .catch((e) => {
          console.log(e);
        });
    
  };

  // const paginate = (pageNumber) => {
  //   if (
  //     pageNumber >= 1 &&
  //     pageNumber <= Math.ceil(filteredInfos.length / cardsPerPage)
  //   ) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

  // const lastIndex = currentPage * cardsPerPage;
  // const firstIndex = lastIndex - cardsPerPage;
  // const currentPosts = filteredInfos.slice(firstIndex, lastIndex);

  return (
    <div className="text-center p-4">
      <div className="bg-body-warning">
        <Header />
      </div>
      <input
        type="text"
        placeholder="Search your Books"
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
        }}
        className="mx-3 rounded-1 border-0 p-1 px-3 mt-3 fw-bolder"
      />
      <button
        onClick={handleSearch}
        className="bg-primary text-white p-1 border-0 rounded-1"
        style={{
          width: "4rem",
        }}
      >
        Go
      </button>
      {loading && <p>Loading...</p>}
      {/* {searchVal && filteredInfos.length === 0 && (
        <p className="mt-2 text-danger fw-bolder">No books found !</p>
      )} */}
      <DisplayData infos={infos} />
      <button className="rounded-1 p-2 bg-primary text-white mx-2" onClick={handlePrevious}>Previous</button>
      <button className="rounded-1 p-2 bg-primary text-white mx-2" >{currentPage}</button>
      <button className="rounded-1 p-2 bg-primary text-white mx-2" onClick={handleNext}>Next</button>
      {/* <Pages
        totalpost={filteredInfos.length}
        paginate={paginate}
        postsper={cardsPerPage}
        current={currentPage}
      /> */}
    </div>
  );
}

export default Fetching;