import React from "react";
import "./css/Header.css";
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";



const Header = () => {

const user = useSelector(selectUser)
const history = useHistory()

  return (
    <header>
      <div className="header-container">
        <div className="header-left"> 
        <Link to="/">
        <img src="./logo.png" alt="logo"/>
        </Link>
          <Link to="/">
          <h3>Queue Interest</h3>
          </Link>
        </div>
        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search.." />
          </div>
        </div>
        <div className="header-right">
        <div className="header-right-container">
          <span onClick={()=> {auth.signOut() 
          history.push('/auth')}}><Avatar src={user?.photo}/></span>
          <MailIcon/>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
