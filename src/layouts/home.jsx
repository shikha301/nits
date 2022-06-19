import React, { useEffect, useState } from "react";
import { Spinner, Badge } from "react-bootstrap";
import { getImageservice, searchImages } from "../services/imageservice";
import Header from "./header";
import style from "./style.css";

function Home(props) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const init = async (page) => {
    setLoading(true);
    const response = await getImageservice(page);
    setImages(response);
    setLoading(false);
  };

  const handleSearch = async (name) => {
    localStorage.setItem("search", name);
    setLoading(true);
    const response = await searchImages(name);
    setImages(response["results"]);
    setLoading(false);
  };

  useEffect(() => {
    if (
      localStorage.getItem("search") !== "undefined" &&
      localStorage.getItem("search") !== "null"
    ) {
      handleSearch(localStorage.getItem("search"));
    } else {
      init(window.location.search.split("=")[1]);
    }

    // setPage(window.location.search.split("=")[1]);
  }, []);

  const removeFilter = () => {
    localStorage.removeItem("search");
    window.location.reload();
  };

  const handlePage = () => {};

  return (
    <>
      <div className="container">
        <Header handleSearch={handleSearch} />
        {localStorage.getItem("search") !== "undefined" &&
          localStorage.getItem("search") !== "null" && (
            <button
              type="button"
              className="btn btn-light mx-1 mb-1 badge rounded-pill text-danger border border-danger border-3"
              style={{ fontSize: "13px" }}
            >
              {localStorage.getItem("search")}{" "}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{ fontSize: "13px" }}
                onClick={() => removeFilter()}
              ></button>
            </button>
          )}
        <div className="row mt-5">
          {loading ? (
            <Spinner animation="grow" />
          ) : (
            images.map((image, index) => (
              <div className="col-sm-4" key={index}>
                <div className="card-group">
                  <div className="card">
                    <img
                      src={image["urls"]["small"]}
                      alt=""
                      className="m-3 rounded "
                      srcSet=""
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href={`/?page=${page-1}`} tabIndex="-1" aria-disabled="true">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/?page=1">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/?page=2">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/?page=3">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href={`/?page=${page+1}`}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Home;
