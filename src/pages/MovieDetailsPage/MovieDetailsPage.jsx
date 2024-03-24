import { useEffect, useState, useRef } from "react";

import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import { filmDetails } from "../../services/films";

import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const getMovieById = async () => {
      try {
        setLoader(true);
        const film = await filmDetails(movieId);
        setMovie(film);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    getMovieById();
  }, [movieId]);

  return (
    <>
      <div className={css.film}>
        <div className={css.photoContainer}>
          {loader && <Loader />}
          <Link className={css.backBtn} to={backLink.current}>
            Go back
          </Link>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={250}
            alt="poster"
          />
        </div>
        <div className={css.filmInfoContainer}>
          <h2 className={css.movieTitle}>{movie.title}</h2>
          <p className={css.score}>
            User score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h3 className={css.overviewHeaders}>Overview: </h3>
          <p className={css.filmOverview}>{movie.overview}</p>
          <h3 className={css.overviewHeaders}>Genres: </h3>
          <ul className={css.genresList}>
            {movie.genres &&
              movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
          </ul>
        </div>
      </div>
      <p className={css.moreInfo}>Additional information</p>
      <ul className={css.filmMoreInfoList}>
        <li>
          <NavLink to="cast" id={movieId}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" id={movieId}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
