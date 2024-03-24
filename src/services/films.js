import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI1ZWE2NmI4ZDVlYTFmZTY2MjY4OWQzYjVlOTE0ZiIsInN1YiI6IjY1ZmIzZDNmNTQ1MDhkMDE2MmY4NGRmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8qRZD7pLMsTu6TdYe93vKf52BDAjzyMmGFccit6AGks";

// Тренди дня
export async function filmsRequest() {
  const response = await axios.get("/trending/movie/day?language=en-US");
  return response.data;
}

// Деталі кожного фільму
export async function filmDetails(id) {
  const response = await axios.get(`/movie/${id}`);
  return response.data;
}

// Для інпуту
export async function filmSearch(query) {
  const response = await axios.get(`/search/movie?query=${query}`);
  return response.data;
}

// Акторський склад
export async function getActors(id) {
  const response = await axios.get(`/movie/${id}/credits`);
  return response.data.cast;
}

// Для огляду на фільм
export async function getMovieReviews(id) {
  const response = await axios.get(`/movie/${id}/reviews`);
  return response.data.results;
}
