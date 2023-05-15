import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                <p className='header-text'>“In the nonstop tsunami of global information, librarians provide us with floaties and teach us to swim.”</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header