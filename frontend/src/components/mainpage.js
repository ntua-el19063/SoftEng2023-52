import * as React from 'react';
import { Link } from 'react-router-dom';
import connection from './axios'

export default function MainPage(){
  async function handleLogout(){
    try{
      const response = await connection.post(`/ntuaflix_api/logout`, null, { withCredentials: true })
      console.log(response)
      if(response.status===200){window.location.href = 'http://localhost:3000/signin'}
  }
  catch(err){
      console.log("axios error")
  }
  }

  return (
    <div>
    <ul>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='/movieDisplay'>Movies</Link>
      </li>
      <li>
        <button
        onClick={handleLogout}
        >Logout</button>
      </li>
    </ul>
  </div>

  );
}