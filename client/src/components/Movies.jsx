import React from "react";

class Movies extends React.Component {
  isInFavorites(movie) {
    for (let i = 0; i < this.props.favorites.length; i++) {
      if (this.props.favorites[i].title === movie.title) {
        return true;
      }
    }
    return false;
  }
  render() {
    return (
      <ul className="movies">
        {this.props.movies.map(movie => {
          return (
            <li className="movie_item">
              <img src={movie.poster_path} />
              <div className="movie_description">
                <h2>{movie.title}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">
                      {movie.release_date || "unknown release data"}
                    </span>
                    <span>2</span>
                  </div>
                  ``
                  <div className="movie_rating">
                    <span className="title">{movie.popularity}</span>
                    <button
                      onClick={
                        this.isInFavorites(movie)
                          ? () => {
                              this.props.deleteMovie(movie);
                            }
                          : () => {
                              this.props.saveMovie(movie);
                            }
                      }
                    >
                      {this.isInFavorites(movie) ? "Un Fav" : "Favorite"}
                    </button>
                    <span>{movie.vote_average}</span>
                  </div>
                </section>
              </div>
            </li>
          );
        })}
      </ul>
    );
    // Make an onClick for each list item. If the movies shown is the search results,
    // onClick add it to the database (do it in the main app, and pass down the function)

    // If you're currently showing the fave list, delete the movie instead
    // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)
  }
}

export default Movies;
