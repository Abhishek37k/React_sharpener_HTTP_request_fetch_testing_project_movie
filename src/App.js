import { useState, useRef, useCallback, useEffect } from "react";
import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const retryTimeoutRef = useRef(null); // to cancel retry

  const FetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await response.json();
      const modifiedMovieList = data.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(modifiedMovieList);
      setIsRetrying(false); // stop retry if successful
    } catch (error) {
      setError(error.message);
      setIsRetrying(true);
      // Retry after 5 seconds
      retryTimeoutRef.current = setTimeout(() => {
        FetchMovieHandler();
      }, 5000);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    FetchMovieHandler();
  }, []);

  function cancelRetryHandler() {
    setIsRetrying(false);
    setError(null);
    clearTimeout(retryTimeoutRef.current);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button> <br></br>
        <br></br>
        <br></br>
        <br></br>
        {isRetrying && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>

      <section>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && error && <h1>{error}</h1>}
        {!isLoading && !error && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
