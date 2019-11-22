import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedOption: null
    };
    this.getGenres = this.getGenres.bind(this);
    this.changeOption = this.changeOption.bind(this);
  }
  changeOption(event) {
    this.setState({ selectedOption: event.target.value });
  }
  getGenres() {
    axios
      .get("/movies/genres")
      .then(({ data }) => {
        this.setState({ genres: data.genres, favorites: data.favorites });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getGenres();
  }
  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />
        <select onChange={this.changeOption}>
          {this.state.genres.map(genre => {
            return <option value={genre.id}>{genre.name}</option>;
          })}
        </select>
        <br />
        <br />
        <button
          onClick={() => {
            let option = this.state.selectedOption;
            this.props.getMovies(option);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
