import React, { useState, useEffect } from "react";
import * as ReactBootstrap from "react-bootstrap";
import BookM from "../Modals/BookM";
import env from "react-dotenv";

function Collection() {
  const [listBooks, setListBooks] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [listViewBooks, setListViewBooks] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [tabState, setTabState] = useState({
    stateAll: { status: "active", tab: "show" },
    stateWisnu: { status: "", tab: "" },
    stateTyas: { status: "", tab: "" },
  });
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(15);
  const [maxDocument, setMaxDocument] = useState(0);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState(15);
  const [id, setId] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllBookCollection(startIndex, endIndex);
    getAllBooks();
  }, []);

  const handleClickImg = async (event) => {
    let dataId = event.target.getAttribute("data-id");
    await setId(dataId);
    setModalShow(true);
  };

  const handleNextPage = async () => {
    if (tabState.stateAll.status === "active") {
      setLoading(true);
      let start = startIndex + range;
      let end = endIndex + range;
      setEndIndex(end);
      setStartIndex(start);
      getAllBookCollection(start, end);
      setLoading(false);
    } else if (tabState.stateWisnu.status === "active") {
      setLoading(true);
      let start = startIndex + range;
      let end = endIndex + range;
      setEndIndex(end);
      setStartIndex(start);
      let filteredBookByUser = await getBooksbyUser("wisnu", start);
      await setListViewBooks(filteredBookByUser);
      setLoading(false);
    } else if (tabState.stateTyas.status === "active") {
      setLoading(true);
      let start = startIndex + range;
      let end = endIndex + range;
      setEndIndex(end);
      setStartIndex(start);
      let filteredBookByUser = await getBooksbyUser("tyas", start);
      await setListViewBooks(filteredBookByUser);
      setLoading(false);
    }
    await console.log(endIndex);
  };

  const handlePrevPage = async () => {
    let start = startIndex - range;
    let end = endIndex - range;
    setStartIndex(start);
    setEndIndex(end);
    if (tabState.stateAll.status === "active") {
      setLoading(true);
      getAllBookCollection(start, end);
      setLoading(false);
    } else if (tabState.stateWisnu.status === "active") {
      setLoading(true);
      let filteredBookByUser = await getBooksbyUser("wisnu", start);
      await setListViewBooks(filteredBookByUser);
      setLoading(false);
    } else if (tabState.stateTyas.status === "active") {
      setLoading(true);
      let filteredBookByUser = await getBooksbyUser("tyas", start);
      await setListViewBooks(filteredBookByUser);
      setLoading(false);
    }
  };

  const changeTab = async (event) => {
    const id = event.target.getAttribute("href");
    const filtered = {};
    Object.keys(tabState).forEach((key) => {
      if (key !== id.substring(1, id.length)) {
        filtered[key] = { status: "", tab: "" };
      }
    });

    if (id === "#stateAll") {
      setLoading(true);
      await setRange(15);
      await setTabState({
        ...filtered,
        stateAll: { status: "active", tab: "show" },
      });
      setStartIndex(0);
      setEndIndex(15);
      await getAllBookCollection(0, 10);
    } else if (id === "#stateWisnu") {
      setLoading(true);
      await setRange(20);
      setStartIndex(0);
      setEndIndex(20);
      let filteredBookbyUser = await getBooksbyUser("wisnu", 0);
      setTabState({
        ...filtered,
        stateWisnu: { status: "active", tab: "show" },
      });
      await setListViewBooks(filteredBookbyUser);
      setLoading(false);
    } else if (id === "#stateTyas") {
      setLoading(true);
      await setRange(20);
      setStartIndex(0);
      setEndIndex(20);
      let filteredBookbyUser = await getBooksbyUser("tyas", 0);
      setTabState({
        ...filtered,
        stateTyas: { status: "active", tab: "show" },
      });
      await setListViewBooks(filteredBookbyUser);
      setLoading(false);
    }
  };

  const getAllBookCollection = async (skip, end) => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getallbook`;
    const response = await fetch(uri, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        limit: `15`,
        skip: `${skip}`,
      }), // body data type must match "Content-Type" header
    }).then((res) => res.json());
    setListViewBooks(response.data);
    setMaxDocument(response.count);
    setLoading(false);
  };

  const getAllBooks = async () => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getallbook`;
    const data = await fetch(uri).then((res) => res.json());
    setListBooks(data);
  };

  const handleSearch = async (event) => {
    if (searchInput.length > 0) {
      filterCollection();
    } else {
      if (tabState.stateAll.status === "active") {
        setListViewBooks([...listBooks]);
      } else if (tabState.stateWisnu.status === "active") {
        let filteredBookbyUser = await getBooksbyUser("wisnu");
        await setListViewBooks(filteredBookbyUser);
      }
    }
  };

  const filterCollection = () => {
    const search = searchInput;
    const books = [...listViewBooks];
    const filteredBooks = books.filter((book) => {
      return book.title
        .toLowerCase()
        .trim()
        .match(search.toString().toLowerCase().trim());
    });
    setListViewBooks([...filteredBooks]);
  };

  const changeSearchInput = async (event) => {
    await setSearchInput(event.target.value);
    if (event.target.value.length > 0) {
      filterCollection();
    } else {
      if (tabState.stateAll.status === "active") {
        setListViewBooks([...listBooks]);
      } else if (tabState.stateWisnu.status === "active") {
        let filteredBookbyUser = await getBooksbyUser("wisnu");
        await setListViewBooks(filteredBookbyUser);
      } else if (tabState.stateTyas.status === "active") {
        let filteredBookbyUser = await getBooksbyUser("tyas");
        await setListViewBooks(filteredBookbyUser);
      }
    }
  };

  const getBooksbyUser = async (name, skip) => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getSingleUser/${name}`;
    const response = await fetch(uri, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        limit: `20`,
        skip: `${skip}`,
      }), // body data type must match "Content-Type" header
    }).then((response) => response.json());
    setMaxDocument(response.count);
    return response.data;
  };

  const handleDelete = async (event) => {
    if (event.keyCode === 8) {
      const search = event.target.value;
      let books = [];
      if (tabState.stateAll.status === "active") {
        getAllBookCollection(startIndex, endIndex);
        books = [...listBooks];
      } else if (tabState.stateWisnu.status === "active") {
        books = await getBooksbyUser("wisnu", startIndex);
      } else if (tabState.stateTyas.status === "active") {
        books = await getBooksbyUser("tyas", startIndex);
      }

      if (books.length > 0) {
        const filteredBooks = books.filter((book) => {
          return book.title
            .toLowerCase()
            .trim()
            .match(search.toString().toLowerCase().trim());
        });
        setListViewBooks([...filteredBooks]);
      }
    }
  };

  return (
    <div id="collection">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${tabState.stateAll.status}`}
            data-toggle="tab"
            href="#stateAll"
            onClick={changeTab}
          >
            All Book
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tabState.stateWisnu.status}`}
            data-toggle="tab"
            href="#stateWisnu"
            onClick={changeTab}
          >
            Wisnu Collection
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tabState.stateTyas.status}`}
            href="#stateTyas"
            onClick={changeTab}
          >
            Tyas Collection
          </a>
        </li>
      </ul>

      <div id="myTabContent" className="tab-content">
        <div id="searchBook" className="p-3">
          <form className="form-inline my-2 my-lg-0 pull-right">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={changeSearchInput}
              onKeyDown={handleDelete}
            />
            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        <div
          className={`tab-pane fade ${tabState.stateAll.status} ${tabState.stateAll.tab}`}
          id="stateAll"
        >
          {loading ? (
            <ReactBootstrap.Spinner className="spinner" animation="border" />
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Categories/Genre</th>
                  <th>Possesion</th>
                  <th>Location</th>
                  <th>Buying Date</th>
                </tr>
              </thead>
              <tbody>
                {listViewBooks.map((book, index) => {
                  return (
                    <tr
                      className="table-success"
                      key={index}
                      data-id={book._id}
                    >
                      <td>{book.title}</td>
                      <td>{book.authors[0]}</td>
                      <td>{book.categories[0]}</td>
                      <td>{book.possession}</td>
                      <td>{book.location}</td>
                      <td>
                        {new Date(book.buyDate).toISOString().substring(0, 10)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="pagination-wrapper">
            <div className="pagination-tab">
              <ul className="pagination">
                <li
                  className={`page-item ${startIndex === 0 ? "disabled" : ""}`}
                >
                  <a className="page-link" href="#" onClick={handlePrevPage}>
                    &laquo;
                  </a>
                </li>
                <li
                  className={`page-item ${
                    endIndex < maxDocument ? "" : "disabled"
                  }`}
                >
                  <a className="page-link" href="#" onClick={handleNextPage}>
                    &raquo;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${tabState.stateWisnu.status} ${tabState.stateWisnu.tab}`}
          id="stateWisnu"
        >
          {loading ? (
            <ReactBootstrap.Spinner className="spinner" animation="border" />
          ) : (
            <ul className="bookShelf">
              {listViewBooks.map((book) => {
                return (
                  <li key={book._id} className="bookItem">
                    <img
                      src={book.imageLinks[0].thumbnail}
                      alt=""
                      onClick={handleClickImg}
                      data-id={book.id}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <div className="pagination-wrapper">
            <div className="pagination-tab">
              <ul className="pagination">
                <li
                  className={`page-item ${startIndex === 0 ? "disabled" : ""}`}
                >
                  <a className="page-link" href="#" onClick={handlePrevPage}>
                    &laquo;
                  </a>
                </li>
                <li
                  className={`page-item ${
                    endIndex < maxDocument ? "" : "disabled"
                  }`}
                >
                  <a className="page-link" href="#" onClick={handleNextPage}>
                    &raquo;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${tabState.stateTyas.status} ${tabState.stateTyas.tab}`}
          id="stateWisnu"
        >
          {loading ? (
            <ReactBootstrap.Spinner className="spinner" animation="border" />
          ) : (
            <ul className="bookShelf">
              {listViewBooks.map((book) => {
                return (
                  <li key={book._id} className="bookItem">
                    <img
                      src={book.imageLinks[0].thumbnail}
                      alt=""
                      onClick={handleClickImg}
                      data-id={book.id}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <div className="pagination-wrapper">
            <div className="pagination-tab">
              <ul className="pagination">
                <li
                  className={`page-item ${startIndex === 0 ? "disabled" : ""}`}
                >
                  <a className="page-link" href="#">
                    &laquo;
                  </a>
                </li>
                <li
                  className={`page-item ${
                    endIndex < maxDocument ? "" : "disabled"
                  }`}
                >
                  <a className="page-link" href="#">
                    &raquo;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {modalShow ? (
        <BookM
          id={id}
          show={modalShow}
          onHide={(change) => {
            setModalShow(false);
            if (change === "change") {
              window.location.reload();
            }
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Collection;
