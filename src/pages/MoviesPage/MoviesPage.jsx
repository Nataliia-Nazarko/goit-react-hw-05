import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { filmSearch } from "../../services/films";

import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    if (value.trim() === "") {
      return;
    }
    setSearchParams({ query: value });
    e.currentTarget.reset();
  };

  const query = searchParams.get("query" ?? "");

  useEffect(() => {
    if (!searchParams) return;

    const fetchData = async () => {
      setLoader(true);
      setError(null);
      setMovies([]);
      try {
        const request = await filmSearch(query);
        setMovies(request.results);
      } catch (error) {
        setError(error.message);
        toast.error("Sorry, there is no movie matching your search query!");
      } finally {
        setLoader(false);
      }
    };

    if (!query) return;
    fetchData();
  }, [query, error, searchParams]);

  return (
    <div className={css.submitFormContainer}>
      <form className={css.submitForm} onSubmit={handleSearch}>
        <input
          className={css.movieSearch}
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search movies"
        />
        <button className={css.submitBtn} type="submit">
          Search
        </button>
      </form>

      {loader && <Loader />}
      {error && <ErrorMessage />}
      <MovieList films={movies} />
    </div>
  );
}
