// import React from 'react';
// import Cookies from "universal-cookie";
// import axios from 'axios';


// // import Client from '../../Client/client.jsx'
// // import Responsable from '../Responsable/responsable.jsx'

// //instantiating Cookies class by creating cookies object
// const cookies = new Cookies();

// class Account extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone_number: "",
//       DNS: "",
//       NSS: "",
//       pathologies_chroniques: "",
//       sous_trait_medi_part: "",
//       password: "",

//       error: "",
//       isAuthenticated: false,
//       userRole: '',
//     };
//   }

//   componentDidMount = () => {
//     this.getSession();
//     this.whoami();

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

//         if(data.user){
//             console.log("You are logged in as: " + data.user.username);
//             this.setState({
//                 username: data.user.username,
//                 first_name: data.user.first_name,
//                 last_name: data.user.last_name,
//                 email: data.user.email,
//                 phone_number: data.user.phone_number,
//                 DNS: data.user.DNS,
//                 NSS: data.user.NSS,
//                 pathologies_chroniques: data.user.pathologies_chroniques,
//                 sous_trait_medi_part: data.user.sous_trait_medi_part,
//             });
//         }
//         })
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



//   //Logout Method

//   logout = () => {
    
//     fetch("/api/user/logout/", {
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
      
//       if(this.state.userRole === 'responsable'){

//         return(
// <>

//             <h1>Hello Boss</h1>
//             <p>You are logged in! <b>Check Your Console</b></p>
//         <p>Username: {this.state.username}</p>
//         <p>First Name: {this.state.first_name}</p>
//         <p>Last Name: {this.state.last_name}</p>
//         <p>Email: {this.state.email}</p>
//         <p>Phone Number: {this.state.phone_number}</p>
//         <p>DNS: {this.state.DNS}</p>
//         <p>NSS: {this.state.NSS}</p>
//         <p>Pathologies Chroniques: {this.state.pathologies_chroniques}</p>
//         <p>Sous Trait Medi Part: {this.state.sous_trait_medi_part}</p>
//         <button className="btn btn-primary mr-2" onClick={this.whoami}>WhoAmI</button>
//         <button className="btn btn-danger" onClick={this.logout}>Log out</button>

// </>
//             )
//       }



//       return (

//           <div>
//             <p>HHHH</p>
//         {/* {this.state.userRole=== "responsable" ? < Responsable/> : < Client/>} */}
//       <p>You are logged in! <b>Check Your Console</b></p>
//         <p>Username: {this.state.username}</p>
//         <p>First Name: {this.state.first_name}</p>
//         <p>Last Name: {this.state.last_name}</p>
//         <p>Email: {this.state.email}</p>
//         <p>Phone Number: {this.state.phone_number}</p>
//         <p>DNS: {this.state.DNS}</p>
//         <p>NSS: {this.state.NSS}</p>
//         <p>Pathologies Chroniques: {this.state.pathologies_chroniques}</p>
//         <p>Sous Trait Medi Part: {this.state.sous_trait_medi_part}</p>

//       <button className="btn btn-primary mr-2" onClick={this.whoami}>WhoAmI</button>
//       <button className="btn btn-danger" onClick={this.logout}>Log out</button>
//       </div>
// )

         



//   }
// }

// export default Account;













// FUNCTION BASED

import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <h1>Hello Boss</h1>
        <p>You are logged in! <b>Check Your Console</b></p>
        <p>Username: {state.username}</p>
        <p>First Name: {state.first_name}</p>
        <p>Last Name: {state.last_name}</p>
        <p>Email: {state.email}</p>
        <p>Phone Number: {state.phone_number}</p>
        <p>DNS: {state.DNS}</p>
        <p>NSS: {state.NSS}</p>
        <p>Pathologies Chroniques: {state.pathologies_chroniques}</p>
        <p>Sous Trait Medi Part: {state.sous_trait_medi_part}</p>
        <button className="btn btn-primary mr-2" onClick={whoami}>WhoAmI</button>
        <button className="btn btn-danger" onClick={logout}>Log out</button>
      </>
    );
  }

  return (
    <div>
      <p>HHHH</p>
      <p>You are logged in! <b>Check Your Console</b></p>
      <p>Username: {state.username}</p>
      <p>First Name: {state.first_name}</p>
      <p>Last Name: {state.last_name}</p>
      <p>Email: {state.email}</p>
      <p>Phone Number: {state.phone_number}</p>
      <p>DNS: {state.DNS}</p>
      <p>NSS: {state.NSS}</p>
      <p>Pathologies Chroniques: {state.pathologies_chroniques}</p>
      <p>Sous Trait Medi Part: {state.sous_trait_medi_part}</p>
      <button className="btn btn-primary mr-2" onClick={whoami}>WhoAmI</button>
      <button className="btn btn-danger" onClick={logout}>Log out</button>
    </div>
  );
};

export default Account;