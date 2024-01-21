import Axios from "./Axios";
import axios from "axios";

// ************ PUBLIC APIs ************

// get all movies Function
export const getAllMoviesService = async (
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random movies Function
export const getRandomMoviesService = async () => {
  const { data } = await Axios.get(`/movies/random/all`);
  return data;
};

// get movie by id Function
export const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data;
};

// get top rated movie Function
export const getTopRatedMovieService = async () => {
  const { data } = await Axios.get(`/movies/rated/top`);
  return data;
};

// review movie Function
export const reviewMovieService = async (token, id, review) => {
  const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete movie Function
export const deleteMovieService = async (token, id) => {
  const { data } = await Axios.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all movies function
export const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete(`/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create movie Function
export const createMovieService = async (token, movie) => {
  const { data } = await Axios.post(`/movies`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update movie Function
export const updateMovieService = async (token, id, movie) => {
  const { data } = await Axios.put(`/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get movie recommendations
export const getRecommnedationMovieService = async (name) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ2MDM3OTc3YmIxNTZmZDc3MTk1ZTBlZGQ1NWI1YyIsInN1YiI6IjY1OWE1YTJiY2E0ZjY3MDA5NTc5NWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9jdD0Rr3eQ2ERzAcjeVyCIaCNCZ-m3M2HoE_AA2gNr0'
    }
  };
  await axios.request(config)
    .then((response) => {
      console.log(response.data);
      return response.data['results'];
    })
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        const id = response[i]['id'];
        const data = getRecommendations(id);
        if (data) {
          break
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
}
const getRecommendations = async (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ2MDM3OTc3YmIxNTZmZDc3MTk1ZTBlZGQ1NWI1YyIsInN1YiI6IjY1OWE1YTJiY2E0ZjY3MDA5NTc5NWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9jdD0Rr3eQ2ERzAcjeVyCIaCNCZ-m3M2HoE_AA2gNr0'
    }
  };
  var data = false;
  await axios.request(config)
    .then((response) => {
      if (response.data['results'].length > 0) {
        data = true;
      }
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};