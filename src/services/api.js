import axios from "axios";

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/configuration",
  headers: {
    accept: "application/json",
    Authorization: "Bearer 9125ea66b8d5ea1fe662689d3b5e914f",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
