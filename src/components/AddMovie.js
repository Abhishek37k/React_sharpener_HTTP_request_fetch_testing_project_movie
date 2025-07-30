import React, { useRef,useState } from "react";
import "./AddMovies.css";

const AddMovie = () => {
    
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const [movieList, setMovieList] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    const newMovie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    console.log(newMovie);
    setMovieList((prevMovies) => [...prevMovies, newMovie]); // ✅ Add new movie

    console.log("All Movies:", [...movieList, newMovie]); // ✅ Show all in console

    // Optional: Clear the form
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };

  return (
    <form onSubmit={submitHandler} className="movie-form">
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required ref={titleRef} />
      </div>
      <div className="form-control">
        <label htmlFor="opening-text">Opening Text</label>
        <textarea
          id="opening-text"
          rows="3"
          required
          ref={openingTextRef}
        ></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="date">Release Date</label>
        <input
          type="date"
          id="date"
          required
          max="2026-12-31"
          ref={releaseDateRef}
        />
      </div>
      <button type="submit" className="add-btn">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovie;
