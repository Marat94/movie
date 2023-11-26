import {Link} from "react-router-dom";
import './navbar.css'
import {forwardRef, useImperativeHandle, useContext, useState} from "react";


const navbarItem = [
  {
    id: 1,
    icon: "/assets/icons/search.png",
    name: "Search",
    link: "/search"
  },
  {
    id: 2,
    icon: "/assets/icons/home.png",
    name: "Home",
    link: "/"
  },
  {
    id: 3,
    icon: "/assets/icons/tv_show.png",
    name: "TV Series",
    link: "/tvSeries"
  },
  {
    id: 4,
    icon: "/assets/icons/video.png",
    name: "Movies",
    link: "/movies"
  },
  {
    id: 5,
    icon: "/assets/icons/genres.png",
    name: "Genres",
    link: "/genres"
  },
  {
    id: 6,
    icon: "/assets/icons/watch_later.png",
    name: "Watch Later",
    link: "/watchLater"
  },
]


const Navbar = forwardRef((props, ref) => {

  const [showNavbar, setShowNavbar] = useState(false);

  useImperativeHandle(ref, () => ({
    onHandleCloseNavbar() {
      setShowNavbar(false)
    }
  }))


  const onHandleOpenNavbar = () => {
    setShowNavbar(true)
  }

  return (
    <div id='menu'>
      <div className="menu_sidenav">
        <div className={`ns_container ${showNavbar ? 'open' : 'close'} `}>
          {navbarItem.map(item => (
            <div className={`menu_item ${showNavbar ? 'show' : 'hide'}`} key={item.id} onClick={onHandleOpenNavbar}>
              <Link to={item.link}><img src={item.icon} alt="Search"/></Link>
              <Link to={item.link} className='menu_item_title'>{item.name} </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
})

export default Navbar;
