/* eslint-disable no-unused-vars */
// FUNCTION BASED

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import './Account.css';
// eslint-disable-next-line no-unused-vars
const cookies = new Cookies();

const Account = () => {

    const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    DNS: "",
    NSS: "",
    pathologies_chroniques: "",
    sous_trait_medi_part: "",
    password: "",
    error: "",
    isAuthenticated: false,
    userRole: '',
  });

  useEffect(() => {
    getSession();
    whoami();
  }, []);

  const getSession = () => {
    fetch("/api/user/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          setState((prevState) => ({ ...prevState, isAuthenticated: true, userRole: data.userRole }));
        } else {
          setState((prevState) => ({ ...prevState, isAuthenticated: false }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const whoami = () => {
    fetch("/api/user/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          console.log("You are logged in as: " + data.user.username);
          setState((prevState) => ({
            ...prevState,
            username: data.user.username,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            email: data.user.email,
            phone_number: data.user.phone_number,
            DNS: data.user.DNS,
            NSS: data.user.NSS,
            pathologies_chroniques: data.user.pathologies_chroniques,
            sous_trait_medi_part: data.user.sous_trait_medi_part,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordChange = (event) => {
    setState((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const handleUserNameChange = (event) => {
    setState((prevState) => ({ ...prevState, username: event.target.value }));
  };

  const isResponseOk = (response) => {
    console.log(response);
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  const logout = () => {
    fetch("/api/user/logout/", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setState((prevState) => ({ ...prevState, isAuthenticated: false }));
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (state.userRole === 'responsable') {
    return (
      <>
      <div className="container"> {/* Apply container style */}
        <h1>Hello Boss</h1>
        {/* Rest of your content */}
        <div className="profile-card"> {/* Apply profile card style */}
          {/* Display user information */}
          <p>Username: {state.username}</p>
          <p>First Name: {state.first_name}</p>
          <p>Last Name: {state.last_name}</p>
          <p>Email: {state.email}</p>
          <p>Phone Number: {state.phone_number}</p>
          <p>DNS: {state.DNS}</p>
          <p>NSS: {state.NSS}</p>
          <p>Pathologies Chroniques: {state.pathologies_chroniques}</p>
          <p>Sous Trait Medi Part: {state.sous_trait_medi_part}</p>
          {/* Buttons */}
          <button className="btn btn-danger" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <section className='section1'> 
    <div className="container"> {/* Apply container style */}
      {/* Rest of your content */}
      <div className="profile-card"> {/* Apply profile card style */}
        {/* Display user information */}
        <p className='textcenter'>You are logged in! </p>
        <div className="inputbox"> {/* Username input box */}
            <div className="label-box">Username:</div>
            <div className="value-box">{state.username}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">First Name</div>
            <div className="value-box">{state.first_name}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">Last Name</div>
            <div className="value-box">{state.last_name}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">Email</div>
            <div className="value-box">{state.email}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">Phone Number</div>
            <div className="value-box">{state.phone_number}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">DNS</div>
            <div className="value-box">{state.DNS}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">NSS</div>
            <div className="value-box">{state.NSS}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">Pathologies Chroniques</div>
            <div className="value-box">{state.pathologies_chroniques}</div>
          </div>
          <div className="inputbox"> {/* Username input box */}
            <div className="label-box">Sous Trait Medi Part</div>
            <div className="value-box">{state.sous_trait_medi_part}</div>
          </div>
        {/* Buttons */}
        <button className='btn-container' onClick={logout}>
          Log out
        </button>
      </div>
    </div>
    </section>
  );
};

export default Account;
