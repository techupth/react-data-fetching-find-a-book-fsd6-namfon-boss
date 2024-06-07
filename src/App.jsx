import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchBook, setSearchBook] = useState("");
  const [bookList, setBookList] = useState([]);

  const handleInput = (event) => {
    setSearchBook(event.target.value);
  };

  async function getBooks() {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchBook}`
      );
      setBookList(result.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks();
  }, [searchBook]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="Search Book Here!"
        onChange={handleInput}
      ></input>
      <ul>
        {bookList.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
