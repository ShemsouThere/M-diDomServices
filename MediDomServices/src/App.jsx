// import { useState, useEffect } from 'react'
// import axios from 'axios'
// function App() {
//   state = { details: [], }

//   useEffect(()=> {
//     console.log(import.meta.env.VITE_API_URL)
//   }, [])


//   let data;
//   axios.get('http://127.0.0.1:8000')
//   .then(res => {
//     data = res.data;
//     this.setState({
//       details: data
//     });
//   })
//   .catch(err => { })

//   return (
//     <>
//     <header>Data Generated From Django</header>
//     <hr></hr>
//     {this.state.details.map((output, id) => (
//       <div key={id}>
//         <div>
//         <h2>{output.title}</h2>
//         <h3>{output.body}</h3>
//         </div>
//       </div>
//     ))}
//     </>
//   )
// }

// export default App




import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);

    axios.get('http://127.0.0.1:8000/api/users/')
      .then(res => {
        console.log('API Response:', res.data);
        setDetails(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <header>Data Generated From Django</header>
      <hr></hr>
      {details.map((output, id) => (
        <div key={id}>
          <div>
            <h2>Username: {output.username}</h2>
            <h3>ID: {output.id}</h3>
            <h3>FirstName: {output.first_name}</h3>
            <h3>LastName: {output.last_name}</h3>
            <h3>Email: {output.email}</h3>
            <h3>Phone Number: {output.phone_number}</h3>
            <h3>User Role: {output.userRole}</h3>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
