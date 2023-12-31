/* eslint-disable no-mixed-spaces-and-tabs */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
// eslint-disable-next-line no-unused-vars
import Client from '../../Client/client.jsx';
// eslint-disable-next-line no-unused-vars
import Responsable from '../Responsable/responsable.jsx';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
const cookies = new Cookies();

const App = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    password: '',
    error: '',
    isAuthenticated: false,
    userRole: '',
  });

  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
    fetch('/api/user/session/', {
      credentials: 'same-origin',
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

  const login = (event) => {
    event.preventDefault();
    fetch('/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookies.get('csrftoken'),
      },
      credentials: 'same-origin',
      body: JSON.stringify({ username: state.username, password: state.password }),
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setState((prevState) => ({ ...prevState, isAuthenticated: true, username: '', password: '', error: '' }));
        navigate("/");
        window.location.reload();
        
      })
      .catch((err) => {
        console.log(err);
        setState((prevState) => ({ ...prevState, error: 'Wrong username or password.' }));
      });
  };



  if (!state.isAuthenticated) {
    return (
      
  <>
  
  <div className="container">

        <section className="form-container sign-in-container">
          <h2 className='h2'>Login</h2>
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input
                type="text"
                placeholder='UserName'
                id="username"
                name="username"
                value={state.username}
                onChange={handleUserNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder='Password'
                id="password"
                name="password"
                value={state.password}
                onChange={handlePasswordChange}
              />
              <div>
                {state.error && <small className="text-danger">{state.error}</small>}
              </div>
            </div>
            <button className="btn" type="submit">
              <strong>Login</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
          </form>

          <div className="overlay-container">
	        <div className="overlay">
	        	<div className="overlay-panel overlay-right">
	        		<h1 className='h1'>Hello, Friend!</h1>
	        		<p className='p'>Enter your personal details and start journey with us</p>
	        		<button className="ghost" id="signUp">Sign Up</button>
	        	</div>
	        </div>
	        </div>
        </section>
      </div>

        </>
      
    );
  }


};

export default App;




// CLASS BASED COMPONENT:

// import React from 'react';
// import Cookies from "universal-cookie";
// import Client from '../../Client/client.jsx'
// import Responsable from '../Responsable/responsable.jsx'

// //instantiating Cookies class by creating cookies object
// const cookies = new Cookies();

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       password: "",
//       error: "",
//       isAuthenticated: false,
//       userRole: '',
//     };
//   }

//   componentDidMount = () => {
//     this.getSession();

//   }

// // Get Session Method
//   getSession = () => {
//     //// Make a GET request to the "/api/user/session/" URL with "same-origin" credentials
//     fetch("/api/user/session/", {
//       credentials: "same-origin",
//     })
//     .then((res) => res.json()) //// Parse the response as JSON
//     .then((data) => {
//       console.log(data); // Log the response data to the console
//       //// If the response indicates the user is authenticated
//       if (data.isAuthenticated) {
//         this.setState({isAuthenticated: true,userRole:data.userRole}); // Update the component's state
//       } else {  // If the response indicates the user is not authenticated
//         this.setState({isAuthenticated: false}); // Update the component's state
//       }
//     })
//       //// Handle any errors that occurred during the fetch
//     .catch((err) => {
//       console.log(err);
//     });
//   }
  
// //Who Am I method
//   whoami = () => {
//     fetch("/api/user/whoami/", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "same-origin",
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("You are logged in as: " + data.user.username);
      
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }

//   handlePasswordChange = (event) => {
//     this.setState({password: event.target.value});
//   }
  
//   handleUserNameChange = (event) => {
//     this.setState({username: event.target.value});
//   }
  
//   isResponseOk(response) {
//     console.log(response);
//     if (response.status >= 200 && response.status <= 299) {
//       return response.json();
//     } else {
//       throw Error(response.statusText);
//     }
//   }

//   //Login Mthod
//   login = (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//      // Make a POST request to the "/api/user/user/login/" URL with the form data
//     fetch("/api/user/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": cookies.get("csrftoken"),
//       },
//       credentials: "same-origin",
//       body: JSON.stringify({username: this.state.username, password: this.state.password}),
//     })
//     .then(this.isResponseOk)
//     .then((data) => {
//       console.log(data);
//       this.setState({isAuthenticated: true, username: "", password: "", error: ""});
  
//     })
//     .catch((err) => {
//       console.log(err);
//       this.setState({error: "Wrong username or password."});
//     });
//   }

//   //Logout Method
//   logout = () => {
//     fetch("/api/user/logout", {
//       credentials: "same-origin",
//     })
//     .then(this.isResponseOk)
//     .then((data) => {
//       console.log(data);
//       this.setState({isAuthenticated: false});
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };


//   // UI Rendering using bootstrap 
//   render() {
//     if (!this.state.isAuthenticated) {
//       return (
//         <div className="container mt-3">
//           <h1>React Cookie Auth</h1>
//           <br />
//           <h2>Login</h2>
//           <form onSubmit={this.login}>
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="username">Password</label>
//               <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
//               <div>
//                 {this.state.error &&
//                   <small className="text-danger">
//                     {this.state.error}
//                   </small>
//                 }
//               </div>
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//         </div>
//       );
//     }



    

//     // if(this.state.userRole == 'responsable'){

//       return (

//         <div>
//         {this.state.userRole=== "responsable" ? < Responsable/> : < Client/>}
//       <p>You are logged in! <b>Check Your Console</b></p>
//       <button className="btn btn-primary mr-2" onClick={this.whoami}>WhoAmI</button>
//       <button className="btn btn-danger" onClick={this.logout}>Log out</button>
//             {/* <h1>Hello Boss</h1>
//           <h1>React Cookie Auth</h1>
//           {/* <button onClick={this.logout}>Prendre un RDV</button> */}
//           {/* <button onClick={this.consultations}>Consultations</button> */}
//           {/* <button onClick={this.compte}>Compte</button> */}
          
//         </div>
//       )
//     // }



//   }
// }

// export default App;