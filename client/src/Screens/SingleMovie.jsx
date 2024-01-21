import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import Layout from "../Layout/Layout";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import { RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";
import Loader from "../Notifications/Loader";
import axios from "axios";
import { getMovieByIdService } from "../Redux/APIs/MoviesServices";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [moviesRcm, setMoviesRcm] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getAllMovies);

  // related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category && m._id !== movie?._id);


  async function getRecommnedationMovie() {
    const data = await getMovieByIdService(id);
    const name = data.name;
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
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getRecommendations(idMovie) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.themoviedb.org/3/movie/${idMovie}/recommendations?language=en-US&page=1`,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ2MDM3OTc3YmIxNTZmZDc3MTk1ZTBlZGQ1NWI1YyIsInN1YiI6IjY1OWE1YTJiY2E0ZjY3MDA5NTc5NWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9jdD0Rr3eQ2ERzAcjeVyCIaCNCZ-m3M2HoE_AA2gNr0'
      }
    };
    var data = false;
    await axios.request(config)
      .then((response) => {
        if (response.data['results'].length > 0) {
          const moviercm = response.data['results'].filter((m) => m.adult === false).slice(0, 5).map((movie) => {
              return {
                _id: movie.id,
                name: movie.title,
                desc: movie.overview,
                image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                userId: "65940f3337a40ec05e8c90a3",
                language: movie.original_language
              }
          });
          console.log(moviercm);
          setMoviesRcm(moviercm);

          data = true;
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  };

  // use Effect
  useEffect(() => async() => {
    //  movie id
    dispatch(getMovieByIdAction(id));
    getRecommnedationMovie();
    //getMovie();
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* rate */}
            <MovieRates movie={movie} />
            {/* related */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Similar Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
            {moviesRcm?.length > 0 && (
              <div className="my-16">
                <Titles title="Movies Recommendation" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {moviesRcm?.slice(0, 5).map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
