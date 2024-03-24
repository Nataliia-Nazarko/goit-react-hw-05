import { useEffect, useState } from "react";
import { getActors } from "../../services/films";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const renderCast = async () => {
      try {
        const response = await getActors(movieId);
        setCast(response);
      } catch (error) {
        console.log(error);
      }
    };

    renderCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      <ul className={css.listCast}>
        {cast.length !== 0 ? (
          cast.map((actor) => (
            <li key={actor.id} className={css.listItemCast}>
              <img
                className={css.castImg}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                width={250}
              />
              <h3 className={css.nameCast}>{actor.name}</h3>
              <p>
                <span className={css.miniAccent}>Character: </span>
                {actor.character}
              </p>
            </li>
          ))
        ) : (
          <p>No cast available</p>
        )}
      </ul>
    </div>
  );
}
