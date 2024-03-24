import { useEffect, useState } from "react";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

import { filmsRequest } from "../../films";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoader(true);
        const movies = await filmsRequest();
        setFilms(movies.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={css.trendingContainer}>
      <h1 className={css.homeHeader}>Trending today</h1>
      {loader && <Loader />}
      <MovieList films={films} />
    </div>
  );
}
