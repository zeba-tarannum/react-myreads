import React from "react";
import { Link } from "react-router-dom";
import RenderBooks from "./RenderBooks";
import PropTypes from "prop-types";

class Bookshelf extends React.Component {
  render() {
    // Destructure props object
    const { state, update } = this.props;

    // Filter books by shelf and store results in respective shelf variables
    let booksReading = state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let booksWantToRead = state.books.filter(
      book => book.shelf === "wantToRead"
    );
    let booksRead = state.books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/* The three sections below will render only if shelf is not empty.
        The RenderBooks component then will be called passing a books state composed only of the books that are inside the rendered shelf. */}
          <div>
            {booksReading.length > 0 && (
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <RenderBooks books={booksReading} update={update} />
                </div>
              </div>
            )}
          </div>
          <div>
            {booksWantToRead.length > 0 && (
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <RenderBooks books={booksWantToRead} update={update} />
                </div>
              </div>
            )}
          </div>
          <div>
            {booksRead.length > 0 && (
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <RenderBooks books={booksRead} update={update} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <Link to="/search" className="open-search search-link">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  state: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  update: PropTypes.func
};

export default Bookshelf;
