import React, { useContext, useEffect } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import MenuDrawer from "../../Components/Drawer/MenuDrawer";
import { SidebarContext } from "../../Context/DrawerContext";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMoviesAction } from "../../Redux/Actions/userActions";

function MobileFooter() {
  const { mobileDrawer, toggleDrawer } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const { userInfo } = useSelector((state) => state.userLogin);
  const active = "bg-white text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3";

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
  }, [dispatch]);

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;
  return (
    <>
      <div className="flex-btn h-full w-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow ">
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to="/favorites" className={Hover}>
            <div className="relative">
              <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute top-3 -right-1">
                {likedMovies?.length > 0 ? likedMovies?.length : 0}
              </div>
              <FiHeart />
            </div>
          </NavLink>
          <NavLink
            to={
              userInfo
                ? userInfo.isAdmin
                  ? "/dashboard"
                  : "/profile"
                : "/login"
            }
            className={Hover}
          >
            <FiUserCheck />
          </NavLink>
          {/* <button onClick={toggleDrawer} className={inActive}>
            <CgMenuBoxed />
          </button> */}
        </div>
      </footer>
    </>
  );
}

export default MobileFooter;
