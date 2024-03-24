import { useEffect, useState } from "react";

import { getMovieReviews } from "../../services/films";
import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReview] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getReviewsById = async () => {
      try {
        const reviews = await getMovieReviews(movieId);
        setReview(reviews);
      } catch (error) {
        console.log(error);
      }
    };

    getReviewsById();
  }, [movieId]);

  return (
    <div>
      {reviews.length !== 0 ? (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewListItem}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie</p>
      )}
    </div>
  );
}
