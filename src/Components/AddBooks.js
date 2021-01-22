import React, { useState, useEffect } from "react";
import Card from "./Card";
import * as ReactBootstrap from "react-bootstrap";
import env from "react-dotenv";

function AddBooks() {
  const [bookName, setBookName] = useState("");
  const [listBooks, setListBooks] = useState([]);
  const [listIdCollection, setListIdCollection] = useState([]);
  const [listName, setListName] = useState([]);
  const [handleError, setHandleError] = useState("");
  const [loading, setLoading] = useState(false);

  const assignBookName = (event) => {
    setBookName(event.target.value);
  };

  const getListBooks = async (name) => {
    const googleKey = `${window.env.REACT_APP_GOOGLE_KEY}`;
    const uri = `${window.env.REACT_APP_GOOGLE_API}?q=${name}&key=${googleKey}&maxResults=20`;
    return await fetch(uri)
      .then((res) => res.json())
      .catch((err) => {
        setHandleError(err);
      });
  };

  const getBooks = async (event) => {
    if (bookName) {
      setLoading(true);
      const data = await getListBooks(bookName);
      if (data.items) {
        setListBooks([...data.items]);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getlistID();
    getAllUser();
  }, []);

  const getlistID = async () => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getallidbook`;
    const listId = await fetch(uri)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setHandleError(err);
      });
    if (listId) {
      setListIdCollection(listId);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      getBooks();
    }
  };

  const saveBookData = async (id, name, date, location) => {
    let data = listBooks[id];
    let body = {
      id: data.id,
      selfLink: data.selfLink,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      categories: data.volumeInfo.categories,
      imageLinks: data.volumeInfo.imageLinks,
      possession: name,
      buyDate: date,
      location: location,
    };
    handleSave(body);
  };

  const handleSave = async (body) => {
    const response = await fetch(`${window.env.REACT_APP_BOOK_API}/addbook`, {
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
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });

    const uri = `${window.env.REACT_APP_BOOK_API}/getallidbook`;
    getlistID(uri);
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const getAllUser = async () => {
    const uri = `${window.env.REACT_APP_BOOK_API}/getAllUser`;
    const res = await fetch(uri).then((response) => response.json());
    const lstUser = res.data;
    if (lstUser) {
      setListName(lstUser);
    }
  };

  return (
    <div>
      <div id="search-book">
        <div className="form-group">
          <label className="col-form-label" htmlFor="inputDefault">
            Search Your Books
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Input Books Title"
            id="inputDefault"
            value={bookName}
            onChange={assignBookName}
            onKeyUp={handleEnter}
          />
          <button type="button" className="btn btn-primary" onClick={getBooks}>
            Search
          </button>
        </div>
      </div>
      <div id="list-th">
        {loading ? (
          <ReactBootstrap.Spinner className="spinner" animation="border" />
        ) : (
          listBooks.map((item, index) => {
            if (listBooks) {
              if (
                item.volumeInfo.imageLinks &&
                item.volumeInfo.title &&
                item.volumeInfo.authors &&
                item.volumeInfo.description
              )
                return (
                  <Card
                    key={index}
                    id={index}
                    imgLink={item.volumeInfo.imageLinks.thumbnail}
                    title={
                      item.volumeInfo.title.length > 50
                        ? item.volumeInfo.title.substring(0, 50) + "..."
                        : item.volumeInfo.title
                    }
                    author={
                      item.volumeInfo.authors.length > 1
                        ? item.volumeInfo.authors[0]
                        : item.volumeInfo.authors
                    }
                    description={
                      item.volumeInfo.description.length > 100
                        ? item.volumeInfo.description.substring(0, 100) + "..."
                        : item.volumeInfo.description
                    }
                    selfLink={item.selfLink}
                    saveBook={saveBookData}
                    onHave={listIdCollection.includes(item.id)}
                    listPosession={listName}
                  />
                );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
}

export default AddBooks;
