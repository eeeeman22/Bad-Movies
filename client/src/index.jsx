import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  getMovies(event) {
    axios
      .get("/movies/search", { params: { genre: event } })
      .then(({ data }) => {
        console.log("DATA", data);
        this.setState({ movies: data });
      });
    // make an axios request to your server on the GET SEARCH endpoint
  }
  getFavorites() {
    axios
      .get("/movies/genres")
      .then(({ data }) => {
        this.setState({ favorites: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  saveMovie(movieObj) {
    axios
      .post("/movies/save", movieObj)
      .then(currentState => {
        this.setState({ favorites: currentState.data });
      })
      .catch(err => {
        console.log(err);
      });
    // same as above but do something diff
  }

  deleteMovie(movieObj) {
    axios
      .delete("/movies/delete", {
        params: {
          title: movieObj.title
        }
      })
      .then(() => {
        this.getFavorites();
      })
      .catch(err => {
        console.log(err);
      });
    // same as above but do something diff
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }
  componentDidMount() {
    // action movies
    this.getFavorites();
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            favorites={this.state.favorites}
            deleteMovie={this.deleteMovie}
            saveMovie={this.saveMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
