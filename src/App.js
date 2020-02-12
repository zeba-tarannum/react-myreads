import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";
import Bookshelf from "./Bookshelf";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    query: "",
    results: [],
    books: []
  };

  componentDidMount() {
    // Retrieve all book data from API and populate state
    BooksAPI.getAll().then(data => {
      this.setState({ books: data });
    });
  }

  searchBooks = query => {
    // Set query state to be the same as user input
    this.setState({ query: query });

    if (query.length > 0) {
      // Retrieve query data from API and set state for search results
      BooksAPI.search(query).then(data => {
        this.setState({
          results: data
        });
      });
    }
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => ({
        // Filter all books in state to find correct book match
        books: prevState.books.filter(b => {
          if (b.id === book.id) {
            // If book is found, set it's current shelf to a new one
            return (book.shelf = shelf);
          } else {
            return book;
          }
        })
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Bookshelf state={this.state} update={this.updateShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              state={this.state}
              update={this.updateShelf}
              search={this.searchBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
