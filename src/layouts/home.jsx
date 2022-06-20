import React, { useEffect, useState } from "react";
import { Spinner, Badge } from "react-bootstrap";
import { getImageservice, searchImages } from "../services/imageservice";
import Header from "./header";
import style from "./style.css";

function Home(props) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const [page, setPage] = useState(1);

  const init = async (pageno) => {
    setLoading(true);
    const response = await getImageservice(pageno);
    setImages(response);
    setLoading(false);
  };

  const handleSearch = async (name, pageNo) => {
    if (!name) {
      setShowError(true);
      localStorage.removeItem("search");
      init(1);
      setLoading(false);
      return;
    }
    
    setShowError(false);
    localStorage.setItem("search", name);
    setLoading(true);
    const response = await searchImages(name, pageNo);
    setImages(response["results"]);
    setLoading(false);
  };

  useEffect(() => {
    let pageNo = 1;

    if (window.location.search.split("=")[1])
      pageNo = parseInt(window.location.search.split("=")[1]);

    if (
      localStorage.getItem("search")
    ) {
      handleSearch(localStorage.getItem("search"), pageNo);
    } else {
      setShowError(false);
      init(pageNo);
    }
    setPage(pageNo);
  }, []);

  const removeFilter = () => {
    localStorage.removeItem("search");
    window.location.reload();
  };

  // const handlePage = () => {};

  return (
    <>
      <div className="container">
        <Header handleSearch={handleSearch} />
        {showError && (
          <div class="alert alert-danger" role="alert">
            Please search for relevant.
          </div>
        )}

        <div className="total-image text-light text-end">
          {/* <h5>Total Image <span class="badge bg-secondary rounded-circle">25</span></h5> */}
          {/* <button class="glow-on-hover" type="button">Total Images 50</button> */}
        </div>
        {localStorage.getItem("search") && (
            <button
              type="button"
              className="btn btn-light mx-1 mb-1 badge rounded-pill text-success border border-success border-3 sbutton"
            >
              {localStorage.getItem("search")}
              <button
                type="button"
                className="btn-close close"
                aria-label="Close"
                onClick={() => removeFilter()}
              ></button>
            </button>
          )}
        <div className="row">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                {/* <Spinner animation="grow" /> */}
              </div>
            </div>
          ) : (
            images.map((image, index) => (
              <div className="col-sm-4 mt-5" key={index}>
                <div className="card-group">
                  <div className="card hover01">
                    <figure class="snip">
                      <img
                        src={image["urls"]["small"]}
                        alt=""
                        className="m-3 rounded "
                        srcSet=""
                      />
                      <figcaption>
                        <h2>{image["id"]}</h2>
                        <p>
                          {image["sponsorship"] &&
                            image["sponsorship"]["sponsor"] &&
                            image["sponsorship"]["sponsor"]["bio"]}
                        </p>
                        <a href="#"></a>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center m-5">
            <li className={page > 1 ? "page-item" : "page-item disabled"}>
              <a
                className="page-link"
                href={`/?page=${page - 1}`}
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className={page === 1 ? "page-item active" : "page-item"}>
              <a className="page-link" href="/?page=1">
                1
              </a>
            </li>
            <li className={page === 2 ? "page-item active" : "page-item"}>
              <a className="page-link" href="/?page=2">
                2
              </a>
            </li>
            <li className={page === 3 ? "page-item active" : "page-item"}>
              <a className="page-link" href="/?page=3">
                3
              </a>
            </li>
            <li className={page === 4 ? "page-item active" : "page-item"}>
              <a className="page-link" href={`/?page=${page ? page + 1 : 1}`}>
                Next
              </a>
            </li>
          </ul>
        </nav>

        <div class="footer">
          &copy;<span> Copyright 2022 NITS Solutions</span>
        </div>
      </div>
    </>
  );
}

export default Home;
