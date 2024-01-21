import React, { useEffect } from 'react'
import SideBar from './SideBar'
import Table from '../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from '../../Notifications/Loader'
import { Empty } from '../../Notifications/Empty'
import { deleteMovieAction } from '../../Redux/Actions/MoviesActions'

function FavoriteMovies() {
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    likedMovies,
  } = useSelector(
    (state) => state.userGetFavoriteMovies
  )

  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector(
    (state) => state.userDeleteFavoriteMovies
  )

  // delele favorites movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure to delete all movies?") &&
      dispatch(deleteFavoriteMoviesAction());
  }

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET"
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want do delete this movie?") &&
      dispatch(deleteMovieAction(id));
  };

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Favorites Movies</h2>
          {
            likedMovies?.length > 0 &&
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className='bg-main font-medium transition hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
              {
                deleteLoading ? "Deleting" : "Delete All"
              }
            </button>
          }

        </div>
        {
          isLoading ?
            <Loader />
            : likedMovies?.length > 0 ? <Table data={likedMovies} admin={false} onDeleteHandler={deleteMovieHandler}/>
              : (
                <Empty message="No favorites movies found" />
              )
        }
      </div>
    </SideBar>
  )
}

export default FavoriteMovies