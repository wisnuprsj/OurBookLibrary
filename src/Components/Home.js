import { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
// import env from "react-dotenv";

function Home() {
  const [genres, setGenres] = useState([]);
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGenre();
    getQuote();
  }, []);

  const getAllGenre = async () => {
    let uri = `${window.env.REACT_APP_BOOK_API}/genre`;
    let response = await fetch(uri).then((res) => res.json());
    await setGenres(response);
  };

  const getQuote = async () => {
    let category_name = "motivational";
    if (genres.length > 0) {
      category_name = genres[Math.floor(Math.random() * genres.length)];
    }
    let uri = `https://brainyquotes.herokuapp.com/quotes?category=${category_name}`;
    let response = await fetch(uri);
    let json = await response.json();
    getRandQuote(json.data);
    setLoading(false);
  };

  const getRandQuote = async (data) => {
    let rand = Math.floor(Math.random() * data.length);
    let pickQuote = data[rand];
    await setQuote(pickQuote);
  };

  return (
    <div className="jumbotron">
      <div className="home-header">
        <h1>Welcome to our Library Books</h1>
        <h2>Application</h2>
        <h6>This is Tyas and Wisnu personal library management system.</h6>
      </div>
      <hr className="my-4" />
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="/AddBooks" role="button">
          Add Books
        </a>
      </p>
      <h6>*for personal use only</h6>
      {loading ? (
        <ReactBootstrap.Spinner className="spinner" animation="border" />
      ) : (
        <div className="slideshow">
          <h1 className="todayQuote">Today's Quote</h1>
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              {quote.quote ? quote.quote.split("-")[0] : ""}
            </p>
            <footer className="blockquote-footer">
              <cite title="Source Title">
                {quote.author ? quote.author : ""}
              </cite>
            </footer>
          </blockquote>
        </div>
      )}
    </div>
  );
}

export default Home;
