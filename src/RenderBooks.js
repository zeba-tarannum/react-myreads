import React from "react";
import PropTypes from "prop-types";

class RenderBooks extends React.Component {
  render() {
    // Destructure props object
    const { books, update } = this.props;

    return (
      <ol className="books-grid">
        {/* Map over books state array and render each book's html */}
        {books.map(eachBook => (
          <li key={eachBook.id}>
            <div className="book">
              <div className="book-top">
                {/* If book contains image links, render it's cover image */}
                {eachBook.imageLinks && (
                  <img
                    src={eachBook.imageLinks.thumbnail}
                    alt={eachBook.title}
                    className="book-cover"
                    style={{ width: 128 }}
                  />
                )}
                {/* If cover image is not found, render a simple placeholder */}
                {!eachBook.imageLinks && (
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 182,
                      backgroundColor: "#aaa",
                      color: "#ccc",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "uppercase"
                    }}
                  >
                    No Image
                  </div>
                )}
                <div className="book-shelf-changer">
                  {/* If book is not on any shelf, give it an empty value; otherwise set the dropdown menu value to shelf name. On menu change, call the update props method to change shelf */}
                  <select
                    id={eachBook.id}
                    value={eachBook.shelf ? eachBook.shelf : "none"}
                    onChange={e => update(eachBook, e.target.value)}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{eachBook.title}</div>
              {/* Books with multiple authors were concatenating results in one line. The fix is to map over authors array and output each result on it's own div */}
              {eachBook.authors &&
                eachBook.authors.map(author => (
                  <div className="book-authors" key={author}>
                    {author}
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

RenderBooks.propTypes = {
  books: PropTypes.array.isRequired,
  update: PropTypes.func
};

export default RenderBooks;
