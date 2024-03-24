import { Link, useLocation } from "react-router-dom";

import css from "./MovieList.module.css";

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {films.map((film) => (
        <li key={film.id}>
          {
            <Link
              className={css.movieListItem}
              state={{ from: location }}
              to={`/movies/${film.id}`}
            >
              {film.title}
            </Link>
          }
        </li>
      ))}
    </ul>
  );
}
