import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/mylogo.png";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { isLogIn } from '../../Recoil';
import { useSetRecoilState } from 'recoil';

const Navbar = () => {
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(isLogIn);
  function handleLogout() {
    setLogin(false);
    navigate("/");
  }
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  return (
    <nav className='navbar' id = "navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to = "/" className='navbar-brand flex'>
            <img style={{height:"3.5rem"}} src = {logoImg} alt = "site logo" />
            <span className='text-uppercase fw-7 fs-24 '>bookhub</span>
          </Link>
          <button onClick={handleLogout}>
        
        </button>
          <button type = "button" className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size = {35} style = {{
              color: `${toggleMenu ? "#fff" : "#010101"}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className = "navbar-nav">
            <li className='nav-item'>
            <Link to = "/" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>LogOut</Link>
            </li>
            {/* <li className='nav-item'>
              <Link to = "book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to = "about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>about</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar