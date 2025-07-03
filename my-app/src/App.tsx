// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './structure/layout';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Bookings from './pages/bookings/bookings';
import Venues from './pages/venues/venues';
import Profile from './pages/profile/profile';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import RouteNotFound from './pages/404NotFound/404notfound';
import "./globalStyle/styles.scss";

import './App.css';

function App() {
  const [hideHeader, setHideHeader] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="venues" element={<Venues />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
