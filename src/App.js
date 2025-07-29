import { useState } from "react";
import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function FetchMovieHandler() {
    setIsLoading(true);
    const response = await fetch("/api/films");

    const data = await response.json();
    const modifiedMovieList = data.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(modifiedMovieList);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{ !isLoading && <MoviesList movies={movies} />}
      { isLoading && <h1>Loading</h1> }
      </section>
    </React.Fragment>
  );
}

export default App;
