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
      setBookList([]);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(getBooks, 500);
    return () => clearTimeout(timeoutId);
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
        {bookList ? (
          bookList.map((book) => <li key={book.id}>{book.volumeInfo.title}</li>)
        ) : (
          <p>
            Not Found.
            <br /> Please enter other words.
          </p>
        )}
      </ul>
    </div>
  );
}

// function App() {
//   const [inputValue, setInputValue] = useState("");
//   const [debouncedInputValue, setDebouncedInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setDebouncedInputValue(inputValue);
//     }, 1000);
//     return () => clearTimeout(timeoutId);
//   }, [inputValue]);

//   return (
//     <div>
//       <input type="text" value={inputValue} onChange={handleInputChange} />
//       <h1>{debouncedInputValue}</h1>
//     </div>
//   );
// }

export default App;
