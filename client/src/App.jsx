import { useEffect, useState } from 'react'
import './App.css'
import { Recommended } from "./Recommended";
import { Saved } from "./Saved";
import { Search } from "./Search";
import { ViewArticle } from "./ViewArticle";
import { Link } from "react-router-dom";
import cookie from "cookie";
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [viewArticle, setViewArticle] = useState(null); //set the article that is currently being viewed

  async function getUser(){
    try {
      const res = await fetch("/me/", {
        credentials: "same-origin",
      });
      if (res.ok) {
        const body = await res.json();
        setUser(body.user);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  
  useEffect(() => {
    getUser();
  }, []);

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      <nav>
        <h1>News Manager</h1>
        <span className="rightnav">
        {(() => {
        if (user != null) {
          return (
            <div>
            Hello, {user.first_name}<br></br>
            <button onClick={logout}>Logout</button>
            </div>
          )
        } else {
          return (
            <div><button>Login</button><button>Create Account</button></div>
          )
        }
      })()}
        </span>
      </nav>
      <div className="main-body">
        <div className="selection-window">
         <div className="selection-window-button"><Link to={"/saved"}>Saved Articles</Link></div>
         <div className="selection-window-button"><Link to={"/"}>Recommended</Link></div>
         <div className="selection-window-button"><Link to={"/search"}>Search</Link></div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
